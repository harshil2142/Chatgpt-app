"use client";

import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { Switch } from "@/components/ui/switch";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import InputWrapper from "@/components/InputWrapper";
import { Input } from "@/components/ui/input";
import FileUpload from "./fileupload/page";


const dropzoneStyle: React.CSSProperties = {
  border: "2px dashed #ccc",
  padding: "20px",
  textAlign: "center" as React.CSSProperties["textAlign"],
};

const App: React.FC = () => {
  const [pdfDataUrl, setPdfDataUrl] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setPdfDataUrl(reader.result as string);
    };

    reader.readAsDataURL(file);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  const [isToggled, setIsToggled] = useState(true);

  const handleToggle = () => {
    setIsToggled(!isToggled);
  };

  const formSchema = z.object({
    prompt: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    const payload = {
      prompt: data.prompt,
    };
    console.log(payload);
  }

  return (
    <>
      {/* <div className="flex items-center justify-between h-9">
        <Image
          src="https://designverification.ai/wp-content/uploads/2024/05/logo.png"
          alt="img"
          width={219}
          height={60}
          
          layout="fixed"
        />
      </div> */}
      <div>
        <div className="flex p-4">
          <div className="w-[60%] flex flex-col">
            <div className="flex h-[15vh]">
              <div className="w-[30%] border-[#3bb34d] border-2 rounded-xl mx-3 flex justify-center items-center">
                <div className="flex justify-center items-center  ">
                  <label className="inline-flex items-center cursor-pointer">
                    <input type="checkbox" value="" className="sr-only peer" />
                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Toggle me</span>
                  </label>
                </div>
              </div>
              <div className="w-[70%] border-[#3bb34d] border-2 rounded-xl mx-3">

              </div>
            </div>
            <div className="flex h-[60vh] mt-[2%]">
              <div className="w-[30%] border-[#3bb34d] border-2 rounded-xl mx-3 flex justify-center items-center">
                <div className="flex justify-center items-center  ">
                  <ul>
                    <li>this is a summury</li>
                    <li>this is a summury</li>
                    <li>this is a summury</li>
                  </ul>
                </div>
              </div>
              <div className="w-[70%] border-[#3bb34d] border-2 rounded-xl mx-3">

              </div>
            </div>
            <div className="flex h-[15vh] mt-[2%]">
              <div className="w-[30%] border-[#3bb34d] border-2 rounded-xl mx-3 flex justify-center items-center">
                <div className="flex justify-center items-center  ">
                  <FileUpload />
                </div>
              </div>
              <div className="w-[70%] border-[#3bb34d] border-2 rounded-xl mx-3">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="p-4 m-auto">
                    <div className="relative">
                      <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                      </div>
                      <input type="search" id="search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50  dark:text-white " placeholder="Search" required />
                      <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-[#3bb34d] hover:gray focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-4 py-2 dark:bg-[#3bb34d] dark:hover:gray">Search</button>
                    </div>

                  </form>
                </Form>
              </div>
            </div>
          </div>
          <div className="w-[40%] pe-4">
            <div className="w-full border-[#3bb34d] border-2 rounded-xl mx-3 h-[95vh]">
              <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700 mx-3">
                <ul className="flex flex-wrap -mb-px">
                  <li className="me-2">
                    <div className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300">HISTORY</div>
                  </li>
                  <li className="me-2">
                    <div className="inline-block p-4 text-[#3bb34d] border-b-2 border-[#3bb34d] rounded-t-lg active dark:text-[#3bb34d] dark:font-medium dark:border-[#3bb34d] " aria-current="page">PDF</div>
                  </li>

                </ul>
              </div>
            </div>

          </div>

        </div>
      </div>
      {/* <div className="">
        <div className="w-70">
          <div className="grid grid-cols-2 h-20 gap-2 p-2">
            <div className="h-full flex items-center justify-center">
              <Switch checked={isToggled} onCheckedChange={handleToggle} />
              {isToggled ? <div>heloo one</div> : <div>heloo two</div>}
            </div>
            <div className="h-full flex items-center">
              <div className="grid grid-cols-2 gap-2">
                {[1, 2, 3, 4].map((_, index) => (
                  <div key={index}>
                    What is today&apos;s most ask question ? I can suggest You.
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 h-55 p-2 gap-2">
            <div className="h-full flex flex-col justify-start">
              <div>
                - Lorem Ipsum is simply dummy text of the printing and
                typesetting industry. Lorem Ipsum 1500s
              </div>
              <div>
                - It is a long established fact that a reader will be distracted
                by the readable content of arem Ipsum is th
              </div>
              <div>
                - making it look like readable English. Many desktop publishing
                packages and web page editors now use L
              </div>
            </div>
            <div className="h-full flex items-center justify-center">
              Content
            </div>
          </div>
          <div className="grid grid-cols-2 h-10 p-2 gap-2">
            <div className="h-full">
              <div {...getRootProps()} style={dropzoneStyle}>
                <input {...getInputProps()} />
                <p>Drag &apos;n&apos; drop some files here</p>
              </div>
            </div>
            <div className="h-full">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <InputWrapper
                    form={form}
                    name="prompt"
                    placeholder="write a prompt"
                    title="Prompt"
                    renderComponent={(props: any) => <Input {...props} />}
                  />
                  <Button className="mt-4">Submit</Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
        <div className="w-30">
          <div className="h-90 w-full p-2">
            <div>
              {pdfDataUrl && (
                <embed
                  src={pdfDataUrl}
                  type="application/pdf"
                  width="100%"
                  height="600px"
                />
              )}
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default App;
