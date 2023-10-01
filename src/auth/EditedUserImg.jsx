import React, { useRef, useState } from "react";
import { RxAvatar } from "react-icons/rx";
import { AiFillCamera } from "react-icons/ai";

const EditedUserImg = () => {
  const [image, setImage] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const inputRef = useRef(null);

  const handleImageClick = () => {
    inputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result);
    };
  };

  return (
    <div>
      <div>
        <label
          htmlFor="image-upload-input"
          className="cursor-pointer relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {isHovered && (
            <div
              className="absolute top-0 left-0 right-0 bottom-0
                 flex items-center justify-center flex-col
                  text-white bg-black bg-opacity-60"
            >
              <AiFillCamera className="text-[26px]" />
              <p className="text-white pl-7 rounded mt-2">Adicionar Imagem</p>
            </div>
          )}
          {image ? (
            <img
              src={image}
              alt="Imagem de perfil"
              className="rounded-[50%] w-32 h-32 shadow-md"
              onClick={handleImageClick}
            />
          ) : (
            <>
              <RxAvatar className="text-[130px] hover:text-slate-300" />
            </>
          )}
          <input
            type="file"
            ref={inputRef}
            onChange={handleImageChange}
            id="image-upload-input"
            className="hidden"
            accept="image/jpeg, image/png"
          />
        </label>
      </div>
    </div>
  );
};

export default EditedUserImg;
