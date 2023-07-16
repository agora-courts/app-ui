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

function ProjectInfo({ setInfo, setPage }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (values) => {
    setInfo((info) => {
      return { ...info, ...values };
    });
    setPage((currPage) => currPage + 1);
  };

  return (
    <>
      Looks good! Now tell us a little bit about your project details. Don't
      worry, you can always update these fields later.
      <form onSubmit={handleSubmit(onSubmit)}>
        <SimpleGrid columns={2} gap={5} mt={5}>
          <FormControl isInvalid={errors.logo}>
            <FormLabel>Logo URL</FormLabel>
            <Input
              placeholder="example.com/logo.png"
              {...register("logo", {
                required: "Field required",
              })}
            />
            <FormErrorMessage>{errors.logo?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.banner}>
            <FormLabel>Banner URL</FormLabel>
            <Input
              placeholder="example.com/banner.png"
              {...register("banner", {
                required: "Field required",
              })}
            />
            <FormErrorMessage>{errors.banner?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.website}>
            <FormLabel>Website URL</FormLabel>
            <Input
              placeholder="agoracourts.com"
              {...register("website", {
                required: "Field required",
              })}
            />
            <FormErrorMessage>{errors.website?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.twitter}>
            <FormLabel>Twitter Handle</FormLabel>
            <Input
              placeholder="@agoracourts"
              {...register("twitter", {
                required: "Field required",
                pattern: {
                  value: /^@.*/,
                  message: "Handles must start with '@'",
                },
              })}
            />
            <FormErrorMessage>{errors.twitter?.message}</FormErrorMessage>
          </FormControl>
        </SimpleGrid>

        <ModalFooter gap={4}>
          <Button type="submit">
            Next
          </Button>
        </ModalFooter>
      </form>
    </>
  );
}

export default ProjectInfo;
