import React, { useEffect, useState } from "react";
import moment from "moment";
import { Button, message, Table } from "antd";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../redux/loaderSlice";
import { getAllMovies } from "../../api/movie";
import MovieForm from "./MovieForm";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const MovieTable = () => {
  const [movies, setMovies] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
          <div style={{ display: "flex" }}>
            <Button
              onClick={() => {
                setIsModalOpen(true);
                setSelectedMovie(data);
                setFormType("edit");
              }}
            >
              <EditOutlined />
            </Button>
            <Button>
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
    <div>
      <div className="d-flex justify-content-end">
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
    </div>
  );
};

export default MovieTable;
