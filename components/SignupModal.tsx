"use client";
import React, { useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { useStoreContext } from "@/context/StoreContext";
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { Checkbox } from "primereact/checkbox";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Select,
  SelectItem,
  Input,
  Spinner,
} from "@nextui-org/react";

const SignupModal = () => {
  const { setVisible, visible } = useStoreContext();
  const [value, setValue] = useState<string>("");
  const [checked, setChecked] = useState<boolean>(false);
  const [auth, setAuth] = useState("login");

  return (
    <div className="card flex justify-content-center">
      <Modal
        isOpen={visible}
        size={"xs"}
        backdrop="transparent"
        onOpenChange={setVisible}
      >
        <ModalContent>
          {(onClose) => (
            <>
              {auth === "login" && (
                <>
                  <ModalHeader className="flex flex-col gap-1 text-xl font-bold">
                    Log in
                  </ModalHeader>
                  <ModalBody>
                    <form className="py-2">
                      <Input
                        type="email"
                        label="Your Email Address"
                        labelPlacement="outside"
                        placeholder="Johndoe@gmail.com"
                        errorMessage="Please enter a valid email"
                        className="mb-10"
                        isRequired
                        required
                        classNames={{
                          inputWrapper:
                            "bg-white border-2 focus-within:border-primary-100",
                        }}
                        name="name"
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
                        classNames={{
                          inputWrapper:
                            "bg-white border-2 focus-within:border-primary-100",
                        }}
                        name="name"
                      />

                      <button
                        type="submit"
                        className="p-2 rounded-md w-full bg-rose-600 text-white"
                      >
                        Login
                      </button>
                      <div className="flex gap-2 justify-center mt-4 ">
                        <input
                          type="checkbox"
                          name=""
                          id=""
                          className=" h-6 w-6"
                        />
                        <p className="text-sm mt-[2px]">
                          I agree to the terms of use and privacy policy.
                        </p>
                      </div>
                    </form>
                    <p className="text-sm mb-5">
                     Create a new account ? {" "}
                      <span onClick={()=>setAuth('signup') } className="text-blue-600 cursor-pointer">
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
                    <form className="py-2">
                      <Input
                        type="text"
                        label="Your Name"
                        labelPlacement="outside"
                        placeholder="John Doe"
                        errorMessage="Please enter a valid name"
                        className="mb-10"
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
                        isRequired
                        required
                        classNames={{
                          inputWrapper:
                            "bg-white border-2 focus-within:border-primary-100",
                        }}
                        name="name"
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
                        classNames={{
                          inputWrapper:
                            "bg-white border-2 focus-within:border-primary-100",
                        }}
                        name="name"
                      />

                      <button
                        type="submit"
                        className="p-2 rounded-md w-full bg-rose-600 text-white"
                      >
                        Create Account
                      </button>
                      <div className="flex gap-2 justify-center mt-4 ">
                        <input
                          type="checkbox"
                          name=""
                          id=""
                          className=" h-6 w-6"
                        />
                        <p className="text-sm mt-[2px]">
                          I agree to the terms of use and privacy policy.
                        </p>
                      </div>
                    </form>
                    <p className="text-sm mb-5">
                      Have an account?{" "}
                      <span onClick={()=>setAuth('login') } className="text-blue-600 cursor-pointer">
                        {" "}
                        Login here
                      </span>
                    </p>
                  </ModalBody>
                </>
              )}
            </>
          )}
        </ModalContent>
      </Modal>{" "}
    </div>
  );
};

export default SignupModal;
