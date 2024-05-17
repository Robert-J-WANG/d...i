import React from "react";
import { Route, Switch } from "react-router-dom";
import Layout from "../../components/Layout";
import Header from "../../components/Header";
import Menu from "../../components/Menu";
import Welcome from "../Welcome/index";
import MovieList from "../movie/MovieList";
import MovieAdd from "../movie/MovieAdd";
import CourseList from "../course/CourseList";
import CourseAdd from "../course/CourseAdd";
import MovieDetail from "../../components/MovieDetial";

export default function Admin() {
  return (
    <Layout header={<Header />} aside={<Menu />}>
      {/* {"children "} */}
      <Switch>
        <Route path="/" exact component={Welcome} />
        <Route path="/students" exact component={MovieList} />
        <Route path="/students/add" exact component={MovieAdd} />
        <Route path="/students/:id" exact component={MovieDetail} />

        <Route path="/courses" exact component={CourseList} />
        <Route path="/courses/add" exact component={CourseAdd} />
      </Switch>
    </Layout>
  );
}
