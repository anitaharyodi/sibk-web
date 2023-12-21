import React, { useEffect, useState } from "react";
import assets from "../../assets";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import {
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { Login } from "../../api/apiAuth";

const LoginPage = () => {
  const navigation = useNavigate();
  const [isDisable, setIsDisable] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const toggleVisibility = () => setShowPassword(!showPassword);
  const validasi = () => {
    setIsDisable(!email || !password);
  };

  useEffect(() => {
    validasi();
  }, [email, password]);

  const {
    isOpen: modalOpen,
    onOpen: openModal,
    onOpenChange: onModalOpenChange,
    onClose: closeModal,
  } = useDisclosure();

  const handleLogin = () => {
    Login({
      email: email,
      password: password,
    })
      .then((res) => {
        sessionStorage.setItem("role", res.user.role);
        sessionStorage.setItem("token", res.token);
        openModal();
      })
      .catch((err) => {
        toast.error(err.message);
        setEmail("");
        setPassword("");
      });
  };

  const handleSaveName = () => {
    sessionStorage.setItem("namaKaryawan", name);
    closeModal();
    setName("");
    navigation("/pages/home");
    toast.success("Berhasil Login");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-primary">
      <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md max-sm:mx-6">
        <img src={assets.LOGO_BAWAH} className="w-20 h-20 mx-auto" alt="Logo" />
        <h2 className="text-2xl font-bold mb-4 mt-2 text-center text-primary tracking-[1px] ">
          Masuk
        </h2>
        <Input
          type="email"
          label="Email"
          value={email}
          labelPlacement="inside"
          variant="bordered"
          color="default"
          required
          className="input input-bordered w-full mb-4"
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          type={showPassword ? "text" : "password"}
          label="Password"
          labelPlacement="inside"
          variant="bordered"
          color="default"
          required
          value={password}
          className="input input-bordered w-full"
          onChange={(e) => setPassword(e.target.value)}
          endContent={
            <button
              className="focus:outline-none"
              type="button"
              onClick={toggleVisibility}
            >
              {showPassword ? (
                <IoMdEyeOff className="text-xl text-gray-700" />
              ) : (
                <IoMdEye className="text-xl text-gray-700" />
              )}
            </button>
          }
        />
        <button
          type="submit"
          disabled={isDisable}
          className={`w-full p-2 ${
            isDisable ? "bg-gray-400" : "bg-secondary"
          } text-white rounded-md ${
            isDisable ? "hover:bg-gray-400" : "hover:bg-[#81A100]"
          }  transition duration-300 mt-6`}
          onClick={() => handleLogin()}
        >
          Masuk
        </button>
      </div>

      <Modal isOpen={modalOpen} onOpenChange={onModalOpenChange}>
        <ModalContent>
          <ModalHeader>
            <div className="flex flex-col items-center w-full">
              <p className="text-center mt-1 uppercase text-[#1E2131] font-bold tracking-[1px]">
                Input Nama Karyawan
              </p>
            </div>
          </ModalHeader>
          <ModalBody>
            <Input
              className="w-full text-medium"
              placeholder="Masukkan Nama Anda"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </ModalBody>
          <ModalFooter>
            <button
              className="w-[200px] h-[40px] rounded-md text-black"
              onClick={() => {
                closeModal();
                setName("");
              }}
            >
              Batal
            </button>
            <button
              className={`${
                !name ? "bg-gray-400" : "bg-[#1E2131]"
              } text-white w-[200px] h-[40px] rounded-md`}
              onClick={() => {
                handleSaveName();
              }}
              disabled={!name}
            >
              Simpan
            </button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default LoginPage;
