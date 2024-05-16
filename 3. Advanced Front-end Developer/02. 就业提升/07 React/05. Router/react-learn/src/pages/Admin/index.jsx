import React from "react";
import { Route } from "react-router-dom";
import Layout from "../../components/Layout";
import Header from "../../components/Header";
import Menu from "../../components/Menu";
import Welcome from "../Welcome/index";
import MovieList from "../movie/MovieList";
import MovieAdd from "../movie/MovieAdd";
import CourseList from "../course/CourseList";
import CourseAdd from "../course/CourseAdd";

export default function Admin() {
  return (
    <Layout header={<Header />} aside={<Menu />}>
      {/* {"children "} */}
      <Route path="/" exact component={Welcome} />
      <Route path="/students" exact component={MovieList} />
      <Route path="/students/add" exact component={MovieAdd} />
      <Route path="/courses" exact component={CourseList} />
      <Route path="/courses/add" exact component={CourseAdd} />
    </Layout>
  );
}
