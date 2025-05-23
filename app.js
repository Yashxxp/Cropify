// const path = require("path");
// const express = require("express");
// const morgan = require("morgan");
// const cookieparser = require("cookie-parser");
// const cropRouter = require("./routes/cropRoutes");
// const userRouter = require("./routes/userRoutes");
// const emailRouter = require("./routes/emailRoute");
// const AppError = require("./utils/appErrors");
// const bookingRouter = require("./routes/bookingRoutes");
// const reviewRouter = require("./routes/reviewRoute");
// const StoreRouter = require("./routes/storeRoutes");
// const addtocartRouter = require("./routes/addtocartRoute");
// const app = express();
// const cors = require("cors");

// if (process.env.NODE_ENV === "development") {
//   app.use(morgan("dev"));
// }
// app.use(express.json());
// //app.use(express.urlencoded({ extended: true }));
// app.use(cookieparser());
// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     credentials: true,
//     origin: true,
//     optionsSuccessStatus: 200,
//     allowedHeaders: [
//       "set-cookie",
//       "Content-Type",
//       "Access-Control-Allow-Origin",
//       "Access-Control-Allow-Credentials",
//     ],
//   })
// );
// // app.use(
// //   cors({
// //     origin: "http://localhost:5173",
// //     credentials: true,
// //     allowedHeaders: [
// //       "set-cookie",
// //       "Content-Type",
// //       "Access-Control-Allow-Origin",
// //       "Access-Control-Allow-Credentials",
// //     ],
// //   })
// // );

// app.use("/api/v1/crops", cropRouter);
// app.use("/api/v1/users", userRouter);
// app.use("/api/v1/email", emailRouter);
// app.use("/api/v1/bookings", bookingRouter);
// app.use("/api/v1/reviews", reviewRouter);
// app.use("/api/v1/store", StoreRouter);
// app.use("/api/v1/cart", addtocartRouter);
// app.all("*", (req, res, next) => {
//   next(new AppError(`can't find the ${req.originalUrl} url`));
// });

// module.exports = app;

const path = require("path");
const express = require("express");
const morgan = require("morgan");
const cookieparser = require("cookie-parser");
const cors = require("cors");
const AppError = require("./utils/appErrors");

const cropRouter = require("./routes/cropRoutes");
const userRouter = require("./routes/userRoutes");
const emailRouter = require("./routes/emailRoute");
const bookingRouter = require("./routes/bookingRoutes");
const reviewRouter = require("./routes/reviewRoute");
const StoreRouter = require("./routes/storeRoutes");
const addtocartRouter = require("./routes/addtocartRoute");

const app = express();

// Use Morgan for logging in development
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Middleware
app.use(express.json());
app.use(cookieparser());

// CORS configuration
const allowedOrigins = [
  "https://cropify-one.vercel.app",
  "http://localhost:5173", // Add any other origins you need to allow
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the Cropify API!');
});

// API Routes
app.use("/api/v1/crops", cropRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/email", emailRouter);
app.use("/api/v1/bookings", bookingRouter);
app.use("/api/v1/reviews", reviewRouter);
app.use("/api/v1/store", StoreRouter);
app.use("/api/v1/cart", addtocartRouter);

// Catch-all route for undefined paths
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find the ${req.originalUrl} URL`, 404));
});

module.exports = app;
