import React, { useEffect, useState } from "react";
import moment from "moment";
import { Button, message, Table } from "antd";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../redux/loaderSlice";
import { getAllMovies } from "../../api/movie";
import MovieForm from "./MovieForm";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import DeleteMovieModal from "./DeleteMovieModal";

const MovieTable = () => {
  const [movies, setMovies] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [formType, setFormType] = useState("add");
  const dispatch = useDispatch();
  const tableHeadings = [
    {
      key: "poster",
      title: "Poster",
      dataIndex: "poster",
      render: (text, data) => {
        return (
          <img
            src={data?.poster}
            alt="Movie Poster"
            style={{ objectFit: "cover" }}
            width="75"
            height="115"
          />
        );
      },
    },
    {
      title: "Movie Name",
      dataIndex: "movieName",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Duration",
      dataIndex: "duration",
      render: (text) => {
        return `${text} Min`;
      },
    },
    {
      title: "Genre",
      dataIndex: "genre",
    },
    {
      title: "Language",
      dataIndex: "language",
    },
    {
      title: "Release Date",
      dataIndex: "releaseDate",
      render: (text, data) => {
        return moment(data.releaseDate).format("MM-DD-YYYY");
      },
    },
    {
      title: "Actions",
      render: (text, data) => {
        return (
          <div className="d-flex gap-10">
            <Button
              onClick={() => {
                setIsModalOpen(true);
                data.releaseDate = moment(data.releaseDate).format(
                  "YYYY-MM-DD"
                );
                setSelectedMovie(data);
                setFormType("edit");
              }}
            >
              <EditOutlined />
            </Button>
            <Button
              danger
              onClick={() => {
                setIsDeleteModalOpen(true);
                setSelectedMovie(data);
              }}
            >
              <DeleteOutlined />
            </Button>
          </div>
        );
      },
    },
  ];

  const getData = async () => {
    try {
      dispatch(showLoading());
      const response = await getAllMovies();
      if (response.success === true) {
        setMovies(response?.data);
      } else {
        message.warning(response?.message);
      }
    } catch (error) {
      message.error(error);
    } finally {
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    // H.W -> reusable hook
    getData();
  }, []);
  return (
    <div style={{ borderRadius: "8px", padding: "5px" }}>
      <div className="d-flex justify-content-end mb-3">
        <Button
          onClick={() => {
            setIsModalOpen(!isModalOpen);
          }}
        >
          Add Movie
        </Button>
      </div>
      <Table columns={tableHeadings} dataSource={movies} />
      {isModalOpen && (
        <MovieForm
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          FetchMovieData={getData}
          formType={formType}
          setSelectedMovie={setSelectedMovie}
          selectedMovie={selectedMovie}
        />
      )}
      {isDeleteModalOpen && (
        <DeleteMovieModal
          isDeleteModalOpen={isDeleteModalOpen}
          selectedMovie={selectedMovie}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          setSelectedMovie={setSelectedMovie}
          FetchMovieData={getData}
        />
      )}
    </div>
  );
};

export default MovieTable;
