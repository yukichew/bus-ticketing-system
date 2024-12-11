import React, { useState, useEffect } from "react";
import Container from "../../components/Container";
import { FaStar } from "react-icons/fa";
import Stars from "../../components/common/Stars";
import BOReview from "../../components/busOperator/BOReview";
import { getRatesAndReviewsByBusOperatorID } from "../../api/rating";

const RatingBar = ({ rating, percentage }) => {
  return (
    <div className="flex items-center">
      <p className="text-sm text-gray-600 font-semibold w-8">{rating}</p>
      <FaStar size={18} className="fill-gray-600" />
      <div className="bg-gray-300 rounded w-full h-3 ml-3">
        <div
          className="h-full rounded bg-yellow-400"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <p className="text-sm text-gray-600 font-semibold ml-3 w-10">
        {percentage}%
      </p>
    </div>
  );
};

const BORatesAndReviews = () => {
  const token = sessionStorage.getItem('token');
  const [totalReviews, setTotalReviews] = useState("");
  const [averageRating, setAverageRating] = useState("");
  const [ratingOne, setRatingOne] = useState("");
  const [ratingTwo, setRatingTwo] = useState("");
  const [ratingThree, setRatingThree] = useState("");
  const [ratingFour, setRatingFour] = useState("");
  const [ratingFive, setRatingFive] = useState("");
  const [oneStarReviews, setOneStarReviews] = useState([]);
  const [twoStarReviews, setTwoStarReviews] = useState([]);
  const [threeStarReviews, setThreeStarReviews] = useState([]);
  const [fourStarReviews, setFourStarReviews] = useState([]);
  const [fiveStarReviews, setFiveStarReviews] = useState([]);
  const [selectedReview, setSelectedReview] = useState("overview");

  const fetchRatesAndReviewData = async () => {
    const results = await getRatesAndReviewsByBusOperatorID(token);
  
    const totalReviews = results?.totalRatesAndReviews || 0;
    const ratesAndReviews = results?.ratesAndReviews || [];
  
    const oneStar = [];
    const twoStar = [];
    const threeStar = [];
    const fourStar = [];
    const fiveStar = [];
  
    const ratingCounts = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    };
  
    ratesAndReviews.forEach((review) => {
      const rate = review.rate;
      if (rate >= 1 && rate <= 5) {
        ratingCounts[rate]++;
        switch (rate) {
          case 1:
            oneStar.push(review);
            break;
          case 2:
            twoStar.push(review);
            break;
          case 3:
            threeStar.push(review);
            break;
          case 4:
            fourStar.push(review);
            break;
          case 5:
            fiveStar.push(review);
            break;
          default:
            break;
        }
      }
    });
  
    const sumOfRatings = ratesAndReviews.reduce((sum, review) => sum + review.rate, 0);
    const averageRating = totalReviews ? sumOfRatings / totalReviews : 0;
    const formattedAverageRating = parseFloat(averageRating.toFixed(2));
    const percentage = (count) => {
      const result = totalReviews ? (count / totalReviews) * 100 : 0;
      return parseFloat(result.toFixed(2));
    };
  
    setTotalReviews(totalReviews);
    setAverageRating(formattedAverageRating);
    setRatingOne(percentage(ratingCounts[1]));
    setRatingTwo(percentage(ratingCounts[2]));
    setRatingThree(percentage(ratingCounts[3]));
    setRatingFour(percentage(ratingCounts[4]));
    setRatingFive(percentage(ratingCounts[5]));
    setOneStarReviews(oneStar);
    setTwoStarReviews(twoStar);
    setThreeStarReviews(threeStar);
    setFourStarReviews(fourStar);
    setFiveStarReviews(fiveStar);
  };  

  useEffect(() => {
    fetchRatesAndReviewData();
  }, []);

  const handleReviewClick = (reviewType) => {
    setSelectedReview(reviewType);
  };

  const reviewTypes = [
    {
      type: "overview",
      label: "Overview",
      count: 
        oneStarReviews.length +
        twoStarReviews.length +
        threeStarReviews.length +
        fourStarReviews.length +
        fiveStarReviews.length,
    },
    { type: "five", label: "5 Stars", count: fiveStarReviews.length },
    { type: "four", label: "4 Stars", count: fourStarReviews.length },
    { type: "three", label: "3 Stars", count: threeStarReviews.length },
    { type: "two", label: "2 Stars", count: twoStarReviews.length },
    { type: "one", label: "1 Star", count: oneStarReviews.length },
  ];

  return (
    <>
      <Container>

      <div className="w-4/5 mt-8 mb-8 mx-auto">
        <div className="flex items-center justify-between">
          <h2 className="font-poppins font-bold text-2xl">Rates & Reviews</h2>
        </div>

        <div className="mt-5 flex flex-col md:flex-row justify-between">
          <div className="w-full md:w-1/3 flex flex-col">
            <div className="w-full text-center md:text-left px-4 py-2">
              <p className="font-poppins font-medium text-lg text-gray-500 mb-1">
                Total Reviews
              </p>
              <div className="flex items-center justify-center md:justify-start">
                <p className="font-poppins font-semibold text-4xl text-primary">
                  {totalReviews}
                </p>
                <p className="font-poppins font-semibold text-sm text-primary mt-3 ml-1">
                  comments
                </p>
              </div>
            </div>

            <div className="w-full text-center md:text-left px-4 py-2">
              <p className="font-poppins font-medium text-lg text-gray-500 mb-1">
                Average Rating
              </p>
              <div className="flex items-center justify-center md:justify-start">
                <p className="font-poppins font-semibold text-4xl text-primary mr-3">
                  {averageRating}.0
                </p>
                <Stars rating={averageRating} />
              </div>
              <p className="font-poppins text-sm text-gray-400">
                Average rating on this year
              </p>
            </div>
          </div>

          <div className="hidden md:block border-l-4 border-gray-100 h-auto mx-4"></div>

          <div className="w-full md:w-2/3 h-auto px-4 py-2">
            <div>
              <p className="font-poppins font-medium text-lg text-gray-500 mb-4">
                Rating Summary
              </p>
              <div className="space-y-2">
                <RatingBar rating="5.0" percentage={ratingFive} />
                <RatingBar rating="4.0" percentage={ratingFour} />
                <RatingBar rating="3.0" percentage={ratingThree} />
                <RatingBar rating="2.0" percentage={ratingTwo} />
                <RatingBar rating="1.0" percentage={ratingOne} />
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold mt-6">Reviews</h2>

          <div className="mt-3 mb-4 flex space-x-3">
            {reviewTypes.map(({ type, label, count }) => (
              <button
                key={type}
                className={`relative px-5 py-2 font-poppins rounded-lg border ${
                  selectedReview === type
                    ? "border-primary bg-primary text-white"
                    : "border-gray-300 text-gray-400"
                } ${
                  selectedReview === type
                    ? ""
                    : "hover:border-2 hover:border-primary hover:text-primary hover:font-medium"
                }`}
                onClick={() => handleReviewClick(type)}
              >
                {label}
                {count > 0 && (
                  <span className="absolute top-0 right-0 -mt-2 -mr-2 h-5 w-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs">
                    {count}
                  </span>
                )}
              </button>
            ))}
          </div>

          <div>
            {selectedReview === "five" &&
              fiveStarReviews.map((review) => (
                <BOReview key={review.id} review={review} fetchRatesAndReviewData={fetchRatesAndReviewData}/>
              ))}
            {selectedReview === "four" &&
              fourStarReviews.map((review) => (
                <BOReview key={review.id} review={review} fetchRatesAndReviewData={fetchRatesAndReviewData}/>
              ))}
            {selectedReview === "three" &&
              threeStarReviews.map((review) => (
                <BOReview key={review.id} review={review} fetchRatesAndReviewData={fetchRatesAndReviewData}/>
              ))}
            {selectedReview === "two" &&
              twoStarReviews.map((review) => (
                <BOReview key={review.id} review={review} fetchRatesAndReviewData={fetchRatesAndReviewData}/>
              ))}
            {selectedReview === "one" &&
              oneStarReviews.map((review) => (
                <BOReview key={review.id} review={review} fetchRatesAndReviewData={fetchRatesAndReviewData}/>
              ))}
            {selectedReview === "overview" &&
              [
                ...oneStarReviews,
                ...twoStarReviews,
                ...threeStarReviews,
                ...fourStarReviews,
                ...fiveStarReviews,
              ].map((review) => <BOReview key={review.id} review={review} fetchRatesAndReviewData={fetchRatesAndReviewData}/>)}
          </div>
        </div>
      </div>

      </Container>
    </>
  );
};

export default BORatesAndReviews;
