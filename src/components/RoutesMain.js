import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home, Settings, Tables, Groups, Users, Error } from "../pages";

const RoutesMain = () => {
  return (
    <Routes>
      <Route
        exact
        path="/"
        element={
          <React.Suspense fallback={<>...</>}>
            <Home />
          </React.Suspense>
        }
      />

      <Route
        exact
        path="/settings"
        element={
          <React.Suspense fallback={<>...</>}>
            <Settings />
          </React.Suspense>
        }
      />

      <Route
        exact
        path="/groups"
        element={
          <React.Suspense fallback={<>...</>}>
            <Groups />
          </React.Suspense>
        }
      />

      <Route
        exact
        path="/users"
        element={
          <React.Suspense fallback={<>...</>}>
            <Users />
          </React.Suspense>
        }
      />
      <Route
        exact
        path="/tables"
        element={
          <React.Suspense fallback={<>...</>}>
            <Tables />
          </React.Suspense>
        }
      />

      <Route
        exact
        path="/error"
        element={
          <React.Suspense fallback={<>...</>}>
            <Error />
          </React.Suspense>
        }
      />
      <Route
        path="*"
        element={
          <React.Suspense fallback={<>...</>}>
            <Error />
          </React.Suspense>
        }
      />
    </Routes>
  );
};

export default RoutesMain;
