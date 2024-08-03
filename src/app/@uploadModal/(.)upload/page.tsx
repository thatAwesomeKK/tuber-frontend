import CloseModal from "@/components/CloseModal";
import Dropzone from "@/components/Dropzone";
import React from "react";

const UploadModal = () => {
  return (
    <div className="fixed inset-0 bg-zinc-900/20 z-50">
      <div className="container flex items-center h-full max-w-2xl mx-auto">
        <div className="relative bg-white w-full h-fit px-2 rounded-lg">
          <div className="absolute top-4 right-4">
            <CloseModal />
          </div>
          <Dropzone className="bg-white h-96 flex justify-center items-center rounded-2xl" />
        </div>
      </div>
    </div>
  );
};

export default UploadModal;
