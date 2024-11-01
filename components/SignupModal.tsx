"use client";
import React, {  useRef, useState } from "react";

import { useStoreContext } from "@/context/StoreContext";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  
  Input,
 
} from "@nextui-org/react";
import axios from "axios";
import { Toast } from "primereact/toast";

const SignupModal = () => {
  const toast = useRef<Toast>(null);
  const { setVisible, visible, setToken, setUserEmail } =
    useStoreContext();
  const [auth, setAuth] = useState("login");
  const url = "https://delisdish-api.onrender.com";
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [formData2, setFormData2] = useState({
    email: "",
    password: "",
  });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData({ ...formData, [name]: value });
  };
  const handleInput2 = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData2({ ...formData2, [name]: value });
  };
  const showSuccess = (message: string) => {
    toast.current?.show({
      severity: "success",
      summary: "Success",
      detail: message,
      life: 3000,
    });
  };
  const showError = (message: string) => {
    toast.current?.show({
      severity: "error",
      summary: "Error",
      detail: message,
      life: 5000,
    });
  };

  const onSubmitSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${url}/api/user/register`, formData);
      if (res.data.success) {
        showSuccess(res.data.message);
        setFormData({
          name: "",
          email: "",
          password: "",
        });
        setAuth("login");
      } else {
        showError(res.data.message);
      }
    } catch (error: unknown) {
      console.error(error);
      
      if (axios.isAxiosError(error)) {
        // Error is an Axios error
        if (error.response && error.response.data) {
          // Display error message from backend if available
          showError(error.response.data.message);
          console.log(error.response.data.message);
        }
      } else {
        // Fallback for network errors or other unexpected issues
        showError("An unexpected error occurred.");
      }
    }
  };
  const onSubmitLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${url}/api/user/login`, formData2);
      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userEmail", res.data.validUser.email);
        setToken(res.data.token);
        setUserEmail(res.data.validUser.email);
        showSuccess(res.data.message);
        setFormData2({
          email: "",
          password: "",
        });
        setVisible(false);
       
      } else {
        showError(res.data.message);
      }
    } catch (error: unknown) {
      console.error(error);
      
      if (axios.isAxiosError(error)) {
        // Error is an Axios error
        if (error.response && error.response.data) {
          // Display error message from backend if available
          showError(error.response.data.message);
          console.log(error.response.data.message);
        }
      } else {
        // Fallback for network errors or other unexpected issues
        showError("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="card flex justify-content-center">
      <Toast ref={toast} />
      <Modal
        isOpen={visible}
        size={"xs"}
        backdrop="transparent"
        onOpenChange={setVisible}
      >
        <ModalContent>
       
            <>
              {auth === "login" && (
                <>
                  <ModalHeader className="flex flex-col gap-1 text-xl font-bold">
                    Log in
                  </ModalHeader>
                  <ModalBody>
                    <form className="py-2" onSubmit={onSubmitLogin}>
                      <Input
                        type="email"
                        label="Your Email Address"
                        labelPlacement="outside"
                        placeholder="Johndoe@gmail.com"
                        errorMessage="Please enter a valid email"
                        className="mb-10"
                        isRequired
                        value={formData2.email}
                        onChange={handleInput2}
                        required
                        classNames={{
                          inputWrapper:
                            "bg-white border-2 focus-within:border-primary-100",
                        }}
                        name="email"
                      />
                      <Input
                        type="password"
                        label="Your password"
                        labelPlacement="outside"
                        placeholder="Password"
                        errorMessage="Please enter a valid password"
                        className="mb-3"
                        isRequired
                        required
                        value={formData2.password}
                        onChange={handleInput2}
                        classNames={{
                          inputWrapper:
                            "bg-white border-2 focus-within:border-primary-100",
                        }}
                        name="password"
                      />

                      <button
                        type="submit"
                        className="p-2 rounded-md w-full bg-rose-600 text-white"
                      >
                        Login
                      </button>
                    
                    </form>
                    <p className="text-sm mb-5">
                      Create a new account ?{" "}
                      <span
                        onClick={() => setAuth("signup")}
                        className="text-blue-600 cursor-pointer"
                      >
                        {" "}
                        Click here
                      </span>
                    </p>
                  </ModalBody>
                </>
              )}
              {auth === "signup" && (
                <>
                  <ModalHeader className="flex flex-col gap-1 text-xl font-bold">
                    Sign Up
                  </ModalHeader>
                  <ModalBody>
                    <form className="py-2" onSubmit={onSubmitSignup}>
                      <Input
                        type="text"
                        label="Your Name"
                        labelPlacement="outside"
                        placeholder="John Doe"
                        errorMessage="Please enter a valid name"
                        className="mb-10"
                        value={formData.name}
                        onChange={handleInput}
                        isRequired
                        required
                        classNames={{
                          inputWrapper:
                            "bg-white border-2 focus-within:border-primary-100",
                        }}
                        name="name"
                      />

                      <Input
                        type="email"
                        label="Your Email Address"
                        labelPlacement="outside"
                        placeholder="Johndoe@gmail.com"
                        errorMessage="Please enter a valid email"
                        className="mb-10"
                        value={formData.email}
                        onChange={handleInput}
                        isRequired
                        required
                        classNames={{
                          inputWrapper:
                            "bg-white border-2 focus-within:border-primary-100",
                        }}
                        name="email"
                      />
                      <Input
                        type="password"
                        label="Your password"
                        labelPlacement="outside"
                        placeholder="Password"
                        errorMessage="Please enter a valid password"
                        className="mb-3"
                        isRequired
                        value={formData.password}
                        onChange={handleInput}
                        required
                        classNames={{
                          inputWrapper:
                            "bg-white border-2 focus-within:border-primary-100",
                        }}
                        name="password"
                      />

                      <button
                        type="submit"
                        className="p-2 rounded-md w-full bg-rose-600 text-white"
                      >
                        Create Account
                      </button>
                     
                    </form>
                    <p className="text-sm mb-5">
                      Have an account?{" "}
                      <span
                        onClick={() => setAuth("login")}
                        className="text-blue-600 cursor-pointer"
                      >
                        {" "}
                        Login here
                      </span>
                    </p>
                  </ModalBody>
                </>
              )}
            </>
          
        </ModalContent>
      </Modal>{" "}
    </div>
  );
};

export default SignupModal;
