import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";

// smoke test
it("renders without crashing", function () {
    render(<Carousel />);
});

// snapshot test
it("matches snapshot", function () {
    const { asFragment } = render(<Carousel />);
    expect(asFragment()).toMatchSnapshot();
});

it("works when you click on the right arrow", function () {
    const { queryByTestId, queryByAltText } = render(<Carousel />);

    // expect the first image to show, but not the second
    expect(
        queryByAltText("Photo by Richard Pasquarella on Unsplash")
    ).toBeInTheDocument();
    expect(
        queryByAltText("Photo by Pratik Patel on Unsplash")
    ).not.toBeInTheDocument();

    // move forward in the carousel
    const rightArrow = queryByTestId("right-arrow");
    fireEvent.click(rightArrow);

    // expect the second image to show, but not the first
    expect(
        queryByAltText("Photo by Richard Pasquarella on Unsplash")
    ).not.toBeInTheDocument();
    expect(
        queryByAltText("Photo by Pratik Patel on Unsplash")
    ).toBeInTheDocument();
});

it("works when you click on the left arrow", function () {
    const { queryByTestId, queryByAltText } = render(<Carousel />);

    // expect the first image to show, but not the second
    expect(
        queryByAltText("Photo by Richard Pasquarella on Unsplash")
    ).toBeInTheDocument();
    expect(
        queryByAltText("Photo by Pratik Patel on Unsplash")
    ).not.toBeInTheDocument();

    // move forward in the carousel to make left arrow visible
    const rightArrow = queryByTestId("right-arrow");
    fireEvent.click(rightArrow);

    // move backward in the carousel
    const leftArrow = queryByTestId("left-arrow");
    fireEvent.click(leftArrow);

    // expect the first image to show, but not the second
    expect(
        queryByAltText("Photo by Pratik Patel on Unsplash")
    ).not.toBeInTheDocument();
    expect(
        queryByAltText("Photo by Richard Pasquarella on Unsplash")
    ).toBeInTheDocument();
});

it("hides the left arrow", function () {
    const { queryByTestId } = render(<Carousel />);

    // test to see if left arrow is hidden while displaying the first image
    expect(queryByTestId("left-arrow")).not.toBeInTheDocument();
});

it("hides the right arrow", function () {
    const { queryByTestId } = render(<Carousel />);

    // move forward in the carousel twice to display third image
    const rightArrow = queryByTestId("right-arrow");
    fireEvent.click(rightArrow);
    fireEvent.click(rightArrow);

    // test to see if left arrow is hidden while displaying the first image
    expect(queryByTestId("right-arrow")).not.toBeInTheDocument();
});
