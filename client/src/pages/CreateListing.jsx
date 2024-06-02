import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import React, { useState } from "react";
import { app } from "../firebase";
export default function CreateListing() {
  const [files, setFile] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
  });
  const [uploadings, setUpLoadings] = useState(false);
  const [imageUploadError, setImageUploadError] = useState(false);

  console.log(formData);
  const handleImageSubmit = async (e) => {
    console.log(e.message);
    if (files.length > 0 && files.length + formData.imageUrls.length > 0) {
      setUpLoadings(true);
      setImageUploadError(false);
      const promises = [];
      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((ulrs) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(ulrs),
          });
          setImageUploadError(false);
          setUpLoadings(false);
        })
        .catch((err) => {
          setImageUploadError("Image upload failed");
          console.log(err);
        });
    } else {
      setImageUploadError("You can only upload 6 images per listing");
      setUpLoadings(false);
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const stogate = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storage = ref(stogate, fileName);
      const uploadTask = uploadBytesResumable(storage, file);
      uploadTask.on(
        "state_changed",
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };

  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">CreateListing</h1>
      <form className="flex flex-col sm:flex-row gap-4">
        <div className=" flex flex-col gap-4 flex-1">
          <input
            type="text"
            placeholder="Name"
            className="border p-3 rounded-lg "
            id="name"
            maxLength="62"
            minLength="10"
            required
          />
          <textarea
            type="text"
            placeholder="Description"
            className="border p-3 rounded-lg "
            id="description"
            required
          />{" "}
          <input
            type="text"
            placeholder="address"
            className="border p-3 rounded-lg "
            id="address"
            required
          />
          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2">
              <input type="checkbox" id="sale" className="w-5 " />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="rent" className="w-5" />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="parking" className="w-5" />
              <span>Parking spot</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="fur" className="w-5" />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="offer" className="w-5" />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-6  ">
            <div className=" flex items-center gap-2">
              <input
                type="number"
                id="bedrooms"
                min="1"
                max="10"
                className="p-3 border border-gray-300 rounded-lg"
                required
              />
              <span>Beds</span>
            </div>
            <div className=" flex items-center gap-2">
              <input
                type="number"
                id="baths"
                min="1"
                max="10"
                className="p-3 border border-gray-300 rounded-lg"
                required
              />
              <span>baths</span>
            </div>
            <div className=" flex items-center gap-2">
              <input
                type="number"
                id="regularPrice"
                min="1"
                max="10"
                className="p-3 border border-gray-300 rounded-lg"
                required
              />
              <span>Regular Price</span>
              <span className="text-xs">($ / month)</span>
            </div>{" "}
            <div className=" flex items-center gap-2">
              <input
                type="number"
                id="discountPrice"
                min="1"
                max="10"
                className="p-3 border border-gray-300 rounded-lg"
                required
              />
              <span>Discount Price</span>
              <span className="text-xs">($ / month)</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <p className="font-semibold">
            {" "}
            Images:
            <span className="font-normal text-gray-600 ml-2">
              The first image will be coved(max-6)
            </span>
          </p>
          <div className="flex gap-4">
            <input
              type="file"
              onChange={(e) => {
                setFile(e.target.files);
              }}
              className="p-3 border border-gay-600 w-full rounded"
              id="images"
              accept="/images/*"
              multiple
            />
            <button
              onClick={handleImageSubmit}
              disabled={uploadings}
              className="p-3 border border-green-600 text-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80"
            >
              {uploadings ? "Uploading..." : "Upload"}
            </button>
          </div>

          <p className="text-red-700">{imageUploadError && imageUploadError}</p>
          {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((url, index) => {
              <div
                key={url}
                className="flex justify-between p-3 border items-center"
              >
                <img
                  src={url}
                  alt="listing image"
                  className="w-40 h-40 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={handleRemoveImage(index)}
                  className="p-3 text-red-700 rounded-lg uppercase hover:opacity-75"
                >
                  Delete
                </button>
              </div>;
            })}
          <button className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
            Create Listing
          </button>
        </div>
      </form>
    </main>
  );
}
