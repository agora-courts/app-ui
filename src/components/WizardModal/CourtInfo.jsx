import React from "react";
import {
  FormControl,
  FormLabel,
  Input,
  SimpleGrid,
  FormErrorMessage,
  Button,
  ModalFooter,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

function CourtInfo({ name, setFormData, setPage }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const isCourtExisting = !!name;

  const onSubmit = (values) => {
    setFormData((data) => {
      return { ...data, ...values };
    });
    setPage((currPage) => currPage + 1);
  };

  return (
    <>
      Let's get started. Fill in the information below, keep in mind your court
      name cannot be changed!
      <form onSubmit={handleSubmit(onSubmit)}>
        <SimpleGrid columns={2} gap={5} mt={5}>
          {!isCourtExisting && (
            <FormControl isInvalid={errors.name}>
              <FormLabel>Name</FormLabel>
              <Input
                placeholder="Agora Court"
                {...register("name", {
                  required: "Field required",
                })}
              />
              <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
            </FormControl>
          )}
          <FormControl isInvalid={errors.projectAddress}>
            <FormLabel>Contract Address</FormLabel>
            <Input
              placeholder="FRX2...zeKG"
              {...register("projectAddress", {
                required: "Field required",
                minLength: {
                  value: 32,
                  message: "Invalid Address",
                },
                maxLength: {
                  value: 44,
                  message: "Invalid Address",
                },
              })}
            />
            <FormErrorMessage>
              {errors.projectAddress?.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.reputationToken}>
            <FormLabel>Reputation Token Mint</FormLabel>
            <Input
              placeholder="AQoK...wajM"
              {...register("reputationToken", {
                required: "Field required",
                minLength: {
                  value: 32,
                  message: "Invalid Address",
                },
                maxLength: {
                  value: 44,
                  message: "Invalid Address",
                },
              })}
            />
            <FormErrorMessage>
              {errors.reputationToken?.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.paymentToken}>
            <FormLabel>Payment Token Mint</FormLabel>
            <Input
              placeholder="AQoK...wajM"
              {...register("paymentToken", {
                required: "Field required",
                minLength: {
                  value: 32,
                  message: "Invalid Address",
                },
                maxLength: {
                  value: 44,
                  message: "Invalid Address",
                },
              })}
            />
            <FormErrorMessage>{errors.paymentToken?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.maxDisputes}>
            <FormLabel>Max Active Disputes</FormLabel>
            <Input
              placeholder="10"
              {...register("maxDisputes", {
                required: "Field required",
                min: {
                  value: 1,
                  message: "Must be at least 1",
                },
              })}
            />
            <FormErrorMessage>{errors.maxDisputes?.message}</FormErrorMessage>
          </FormControl>
        </SimpleGrid>

        <ModalFooter gap={4}>
          <Button type="submit">Next</Button>
        </ModalFooter>
      </form>
    </>
  );
}

export default CourtInfo;
