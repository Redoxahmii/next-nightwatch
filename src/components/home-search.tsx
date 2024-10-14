"use client";
import { Button, Input } from "@nextui-org/react";
import { Search } from "lucide-react";

export default function HomeSearch() {
  const InputDisabled = true;
  return (
    <>
      <Input
        type="text"
        variant="flat"
        isInvalid={InputDisabled}
        isRequired
        // errorMessage={searchInputError}
        size="md"
        isClearable
        className="w-full lg:w-96"
        placeholder="Search for media..."
        // onChange={(e) => setSearchTerm(e.target.value)}
        startContent={
          <Search
            className={InputDisabled ? "text-red-600" : " text-default-400"}
          />
        }
      />
      <Button
        // isDisabled={Buttonloading}
        // isLoading={Buttonloading}
        className="lg:px-10"
        color="secondary"
        variant="shadow"
        // onPress={handleSubmit}
      >
        Search
      </Button>
    </>
  );
}
