import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import path from "path"; // Added to resolve absolute paths


const registerUser = asyncHandler(async (req, res, next) => {
  // Debug safe logging
  console.log("req.body:", req.body);
  console.log("req.files:", req.files ? req.files : "NO FILES FOUND");
  console.log("avatar key:", req.files && req.files.avatar ? req.files.avatar : "NO AVATAR KEY");


  //get user details from frontend
  //validation - not empty 
  //check if user already exists: username email 
  //check for images, check for avatar
  //upload them to cloudinary, avatar is mandatory
  //create user object - create entry in db 
  //remove password and refresh token field from response 
  //check for user creation success
  //return response to frontend
  //hash the password
  //store the user in db
  //send response


  const { fullName, email, username, password } = req.body;
  console.log("email: ", email);


  // if (fullName === "") {
  //   throw new ApiError(400, "Full name is required");
  // }


  if (
    [fullName, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }


  const existedUser = await User.findOne({
    $or: [{ username }, { email }]
  });


  if (existedUser) {
    throw new ApiError(409, "User with given username or email already exists");
  }

// console.log(req.files);


  const avatarLocalPath = req.files?.avatar?.[0]?.path;
  const coverImageLocalPath = req.files?.coverImage?.[0]?.path;


  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar is required");
  }

  // Convert relative to absolute paths before upload
  const avatarAbsolutePath = path.resolve(avatarLocalPath);
  const coverImageAbsolutePath = coverImageLocalPath ? path.resolve(coverImageLocalPath) : null;


  // Upload images on Cloudinary
  const avatar = await uploadOnCloudinary(avatarAbsolutePath);
  const coverImage = coverImageAbsolutePath
    ? await uploadOnCloudinary(coverImageAbsolutePath)
    : "";


  if (!avatar) {
    throw new ApiError(500, "Could not upload avatar. Please try again later");
  }


  const user = await User.create({
    fullName,
    avatar, // avatar returns secure_url string now
    coverImage: coverImage || "",
    email,
    password,
    username: username.toLowerCase(),
  });


  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken" //this will exclude password and refresh token from the response
  );


  if (!createdUser) {
    throw new ApiError(500, "Could not create user. Please try again later");
  }


  return res.status(201).json(
    new ApiResponse(200, "User registered successfully", createdUser)
  );
});


export {
  registerUser,
};
