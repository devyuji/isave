"use client";

import Modal from "../components/modal";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { TOGGLE } from "../redux/reducer/token";

function ShowLimitError() {
  const show = useAppSelector((state) => state.token.showMenu);
  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(TOGGLE());
  };

  if (show) {
    return (
      <Modal handleClose={handleClose}>
        <div>
          <div className="flex justify-end mb-2">
            <button
              type="button"
              onClick={handleClose}
              className="p-2 rounded-lg hover:bg-zinc-900 hover:text-white transition-colors"
            >
              <svg
                viewBox="0 0 24 24"
                width="20"
                height="20"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          <p className="font-bold text-2xl text-zinc-800 mb-1">Slow down!</p>
          <p className="text-sm text-gray-600">
            You have exceeded the maximum request rate. Please wait a moment and
            try again.
          </p>
        </div>
      </Modal>
    );
  }

  return null;
}

export default ShowLimitError;
