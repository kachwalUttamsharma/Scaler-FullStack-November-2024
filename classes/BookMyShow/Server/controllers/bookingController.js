const stripe = require("stripe")(process.env.STRIPE_KEY);
const mongoose = require("mongoose");
const Booking = require("../models/bookingSchema");
const Show = require("../models/showSchema");
const emailHelper = require("../utils/emailHelper");

const makePayment = async (req, res, next) => {
  try {
    const { token, amount } = req.body;
    const customer = await stripe.customers.list({
      email: token.email,
      limit: 1,
    });
    let currCustomer = null;
    if (customer.data.length > 0) {
      currCustomer = customer.data[0];
    } else {
      currCustomer = await stripe.customers.create({
        source: token.id,
        email: token.email,
      });
    }
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "usd",
      customer: currCustomer.id,
      payment_method_types: ["card"],
      receipt_email: token.email,
      description: "Token has been assigned",
    });
    const transactionId = paymentIntent.id;
    res.send({
      success: true,
      message: "Payment Successfull",
      data: transactionId,
    });
  } catch (error) {
    res.status(400);
    next(error);
  }
};

const bookShow = async (req, res, next) => {
  try {
    const newBooking = new Booking(req.body);
    await newBooking.save();
    const show = await Show.findById(req.body.show);
    const updatedBookedSeats = [...show.bookedSeats, ...req.body.seats];
    await Show.findByIdAndUpdate(req.body.show, {
      bookedSeats: updatedBookedSeats,
    });

    const populatedBooking = await Booking.findById(newBooking._id)
      .populate({
        path: "user",
        select: "-password",
      })
      .populate({
        path: "show",
        populate: {
          path: "movie",
          model: "movies",
        },
      })
      .populate({
        path: "show",
        populate: {
          path: "theatre",
          model: "theatres",
        },
      });

    const metaData = {
      name: populatedBooking.user.name,
      movie: populatedBooking.show.movie.movieName,
      theatre: populatedBooking.show.theatre.name,
      date: populatedBooking.show.date,
      time: populatedBooking.show.time,
      seats: populatedBooking.seats,
      amount: populatedBooking.seats.length * populatedBooking.show.ticketPrice,
      transactionId: populatedBooking.transactionId,
    };
    await emailHelper(
      "ticketTemplate.html",
      populatedBooking.user.email,
      metaData
    );
    res.send({
      success: true,
      message: "Payment Successfull",
      data: newBooking,
    });
  } catch (error) {
    res.status(400);
    next(error);
  }
};

const getAllBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find({ user: req.body.userId })
      .populate({
        path: "user",
        select: "-password",
      })
      .populate({
        path: "show",
        populate: {
          path: "movie",
          model: "movies",
        },
      })
      .populate({
        path: "show",
        populate: {
          path: "theatre",
          model: "theatres",
        },
      });
    res.send({
      success: true,
      message: "Bookings Fetched",
      data: bookings,
    });
  } catch (error) {
    res.status(400);
    next(error);
  }
};

const makePaymentAndBookShow = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  let paymentIntent;
  try {
    const { token, amount, seats, show: showId } = req.body;

    // step 1: check if the customer already exists in stripe
    const customer = await stripe.customers.list({
      email: token.email,
      limit: 1,
    });
    let currCustomer = null;
    if (customer.data.length > 0) {
      currCustomer = customer.data[0];
    } else {
      currCustomer = await stripe.customers.create({
        source: token.id,
        email: token.email,
      });
    }

    // step2: create a payment intent using the customer
    paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "usd",
      customer: currCustomer.id,
      payment_method_types: ["card"],
      receipt_email: token.email,
      description: "Token has been assigned",
    });
    const transactionId = paymentIntent.id;

    // step 3: booking the show if payment is succesfull
    const show = await Show.findById(showId).populate("movie").session(session);
    const seatAlreadyBooked = seats.some((seat) =>
      show.bookedSeats.includes(seat)
    );
    if (seatAlreadyBooked) {
      throw new Error("One or more seats are already booked.");
    }

    const updatedBookedSeats = [...show.bookedSeats, ...seats];
    await Show.findByIdAndUpdate(req.body.show, {
      bookedSeats: updatedBookedSeats,
    }).session(session);

    const newBooking = new Booking({
      ...req.body,
      transactionId,
    });
    await newBooking.save({ session });

    // step 4: send email notification
    const populatedBooking = await Booking.findById(newBooking._id)
      .populate("user")
      .populate("show")
      .populate({
        path: "show",
        populate: { path: "movie", model: "movies" },
      })
      .populate({
        path: "show",
        populate: { path: "theatre", model: "theatres" },
      })
      .session(session);

    await session.commitTransaction();
    session.endSession();

    res.send({
      success: true,
      message: "Payment and Booking successful!",
      data: populatedBooking,
    });

    await emailHelper("ticketTemplate.html", populatedBooking.user.email, {
      name: populatedBooking.user.name,
      movie: populatedBooking.show.movie.movieName,
      theatre: populatedBooking.show.theatre.name,
      date: populatedBooking.show.date,
      time: populatedBooking.show.time,
      seats: populatedBooking.seats,
      amount: populatedBooking.seats.length * populatedBooking.show.ticketPrice,
      transactionId: populatedBooking.transactionId,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    if (err.message.includes("One or more seats are already booked.")) {
      // start the refund process;
      // await stripe.refunds.create({payment_intent: paymentIntent._id});
    }
    res.status(400);
    next(error);
  }
};

module.exports = {
  bookShow,
  makePayment,
  getAllBookings,
  makePaymentAndBookShow,
};
