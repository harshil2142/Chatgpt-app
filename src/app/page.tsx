"use client";

import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import 'remixicon/fonts/remixicon.css'
import Logo from "/public/logo.png"
import Avatar from "/public/avatar.png"
import Chatgpt from "/public/chatgpt.png"
import { Switch } from "@/components/ui/switch";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import InputWrapper from "@/components/InputWrapper";
import { Input } from "@/components/ui/input";
import "react-toastify/dist/ReactToastify.css";
import { Document, Page } from 'react-pdf';
import FileUpload from "../components/fileupload/page";
import {
  ResizablePanelGroup,
  ResizableHandle,
  ResizablePanel,
} from "@/components/ui/resizable";
import { ToastContainer, toast } from "react-toastify";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getRequest } from "@/services/api";
import PdfViewer from "@/components/PdfViewer/PdfViewer";

const dropzoneStyle: React.CSSProperties = {
  border: "2px dashed #ccc",
  padding: "20px",
  textAlign: "center" as React.CSSProperties["textAlign"],
};

const App: React.FC = () => {
  const userId = localStorage.getItem("userId")

  const [pdfDataUrl, setPdfDataUrl] = useState<string | null>(null);
  const [summaryState, setSummaryState] = useState<any>(null)
  const [promptListState, setPromptListState] = useState<any>([])
  const [historyState, setHistoryState] = useState<any>([])

  // const [isToggled, setIsToggled] = useState(true);

  const fetchHistory = async () => {
    const response: any = await getRequest({ url: "/history/get", params: { userId, page: 1, size: 7 } })
    setHistoryState(response?.data?.data)
  }

  useEffect(() => {
    fetchHistory()
  }, [])


  // const handleToggle = () => {
  //   setIsToggled(!isToggled);
  // };

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

  const resetStateHndler = () => {
    // setHistoryState([])
    setPromptListState([])
  }

  const setHistoryHndler = (index: number) => {
    const data = historyState[index];
    setPromptListState(data?.history)
    setSummaryState(data?.summary)
    setPdfDataUrl(data?.pdfUrl)
  }

  const handleCopy = async (text: any) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success('Text copied to clipboard!');
    } catch (error) {

      toast.error('Failed to copy text. Please try again.');
    }
  };

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
        <div className="flex">
          <ResizablePanelGroup direction="horizontal">
            <ResizablePanel defaultSize={60}>
              {/* <div className="w-[100%] flex flex-col">
                <div className="flex h-[15vh]">
                  <div className="w-[30%] border-[#3bb34d] border-2 rounded-xl mx-3 flex justify-center items-center">
                    <div className="flex justify-center items-center  ">
                      <label className="inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          value=""
                          className="sr-only peer"
                        />
                        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                          Toggle me
                        </span>
                      </label>
                    </div>
                  </div>
                  <div className="w-[70%] border-[#3bb34d] border-2 rounded-xl mx-3"></div>
                </div>
                <div className="flex h-[60vh] mt-[2%]">
                  <div className="w-[30%] border-[#3bb34d] border-2 rounded-xl mx-3 flex justify-center items-center">
                    <div className="flex justify-center items-center text-center ">
                      {summaryState || "No Summury Found"}
                    </div>
                  </div>
                  <div className="w-[70%] border-[#3bb34d] border-2 rounded-xl mx-3">
                    {(promptListState || [])?.map((item: any, index: number) => (
                      <>
                        <div className="flex flex-col border-gray-400 border-2 my-3 overflow-y-auto px-3 pt-3 rounded-2xl text-sm mx-3">
                      
                          <div>propmpt : {item?.prompt}</div>
                          <div>answer : {item?.response}</div>
                          <button onClick={() => handleCopy(item?.response)} className="ms-auto border-gray-400 rounded-xl p-2 me-[-12px] bg-gray-100 hover:bg-gray-200">Copy Answer</button>
                        </div>
                      </>
                    ))}
                  </div>
                </div>
                <div className="flex h-[15vh] mt-[2%]">
                  <div className="w-full border-[#3bb34d] border-2 rounded-xl mx-3 flex justify-center items-center">
                    <div className="flex justify-center items-center">
                      <FileUpload setSummaryState={setSummaryState} setPdfDataUrl={setPdfDataUrl} resetStateHndler={resetStateHndler} />
                    </div>
                    <Form {...form}>
                      <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="p-4 m-auto flex justify-center items-center"
                      >
                        <div className="relative">
                          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg
                              className="w-4 h-4 text-gray-500 dark:text-gray-400"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 20 20"
                            >
                              <path
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                              />
                            </svg>
                          </div>
                          <input
                            type="search"
                            id="search"
                            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50  dark:text-white "
                            placeholder="Search"
                          />

                        </div>
                        <button
                          type="submit"
                          className="text-white bg-[#3bb34d] hover:gray focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-4 py-2 dark:bg-[#3bb34d] dark:hover:gray ms-3"
                        >
                          Search
                        </button>
                      </form>
                    </Form>
                  </div>

                </div>
              </div> */}
              <div className="w-full flex">
                <div className="w-[30%] p-4 pr-0 border-r-2 border-[#ECEFF3] h-screen bg-white flex flex-col justify-between">

                  <div>

                    <div>
                      <Image src={Logo} alt="image" height={"100"} width={"100"} />
                    </div>
                    <div>
                      <Button className="mt-4 w-[90%] me-4 text-start">
                        <div className="flex justify-start items-center">
                          <i className="ri-add-line text-white mx-3"></i>
                          Start New Chat
                        </div>
                      </Button>
                    </div>
                    <div className="text-[#808897] text-sm mt-3 flex items-center">
                      RECENT CHATS <hr className="ms-[2%] w-[40%]" />
                    </div>
                    <div className="overflow-y-auto h-[50vh]">
                      {(historyState)?.map((item: any, index: number) => (
                        <div className="w-[90%] border-2 border-gray-300 rounded-xl h-10 mt-3 flex justify-center hover:bg-slate-50 items-center cursor-pointer bg-[#DFE1E6] text-black" onClick={() => {
                          setHistoryHndler(index)
                        }}>
                          {/* {item?.summary} */}
                          this is a summury
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="w-full h-10 rounded-2xl mt-2 flex justify-start items-center cursor-pointer hover:bg-slate-100 px-2">

                      <i className="ri-delete-bin-line text-[#666D80] me-3 text-lg"></i>
                      Clear all conversations

                    </div>
                    <div className="w-full h-10 rounded-2xl mt-2 flex justify-start items-center cursor-pointer hover:bg-slate-100 px-2">

                      <i className="ri-upload-2-line text-[#666D80] me-3 text-lg"></i>
                      Upgrade to plus
                    </div>
                    <div className="w-full h-10 rounded-2xl mt-2 flex justify-start items-center cursor-pointer hover:bg-slate-100 px-2">

                      <i className="ri-exchange-line text-[#666D80] me-3 text-lg"></i>
                      Update & FAQ
                    </div>
                    <div className="w-full h-10 rounded-2xl mt-2 flex justify-start items-center cursor-pointer hover:bg-slate-100 px-2">

                      <i className="ri-settings-5-line text-[#666D80] me-3 text-lg"></i>
                      Setting
                    </div>
                  </div>
                </div>
                <div className="w-[70%] p-4 flex flex-col justify-between bg-[#F6F6F6] h-screen ">
                  <div>
                    <div className="flex mb-3 justify-between items-center ">
                      <div className="text-xl font-bold">Design Verification Chat Board</div>
                      <div><i className="ri-upload-2-line text-lg cursor-pointer"></i></div>
                    </div>
                    <div className="my-3 p-3 h-[70vh] bg-white rounded-2xl flex flex-col overflow-y-auto">
                     { promptListState?.map((item:any,index:any)=>(
                      <>
                      <div className="flex flex-col">
                        <div className="flex">
                          <div><Image className="w-10 h-10 rounded-full" src={Avatar} width={40} height={40} alt="Rounded avatar" /></div>
                          <div className="flex flex-col ms-2">
                            <div className="text-lg">You</div>
                            <div className="text-sm text-[#666D80] my-2">@craiglevin</div>
                            <div className="text-base text-[#666D80]">{item?.prompt}</div>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col my-6">
                        <div className="flex">
                          <div><Image className="w-10 h-10 rounded-full" src={Chatgpt} width={400} height={400} alt="chatgpt" /></div>
                          <div className="flex flex-col ms-2">
                            <div className="text-lg">Design Verification AI</div>
                            <div className="text-sm text-[#666D80] my-2">@designai</div>
                            <div className="text-base text-[#666D80] mb-2">{item?.response}</div>
                            <div onClick={()=>{
                              navigator.clipboard.writeText(item?.response)
                              toast.success("text copied.")
                            }} ><i className="ri-clipboard-line text-base cursor-pointer"></i></div>
                          </div>
                        </div>
                      </div>
                      </>
                     )) 
                     }
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="mt-2 mb-3 relative">
                      <input
                        type="text"
                        className="w-full py-2 pl-4 pr-10 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm "
                        placeholder="Message Design Verification AI..."
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer">
                        <i className="ri-send-plane-fill w-5 h-5 text-gray-400"></i>
                      </div>
                    </div>
                    <div className="mb-3 text-[#666D80] ">Recommended Questions:</div>
                    <div className="flex">
                      <div className="px-3 py-2 me-2 text-sm hover:bg-slate-200 bg-[#D9D9D9] text-black rounded-xl cursor-pointer">
                        Design style
                      </div>
                      <div className="px-3 py-2 me-2 text-sm bg-[#D9D9D9] hover:bg-slate-200 text-black rounded-xl cursor-pointer">
                        Change furniture or color
                      </div>
                      <div className="px-3 py-2 text-sm bg-[#D9D9D9] hover:bg-slate-200 text-black rounded-xl cursor-pointer">
                        Design uploaded picture
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={40}>
              {/* <div className="w-[100%] px-4">
                <div className="w-full border-[#3bb34d] border-2 rounded-xl h-[95vh]">
                  <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
                    <Tabs defaultValue="history" className="w-[100%] p-4">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="history">
                          <div>
                            HISTORY
                          </div>
                        </TabsTrigger>
                        <TabsTrigger value="pdf">
                          <div>PDF</div>
                        </TabsTrigger>
                      </TabsList>
                      <TabsContent value="history">
                        {historyState?.map((item: any, index: number) => (
                          <div className="w-full border-2 border-gray-300 rounded-2xl h-10 mt-3 flex justify-center items-center cursor-pointer hover:bg-slate-50" onClick={() => {
                            setHistoryHndler(index)
                          }}>
                            {item?.summary}
                          </div>
                        ))}
                      </TabsContent>
                      <TabsContent value="pdf">
                        <div>
                          <Document file={"https://www.clickdimensions.com/links/TestPDFfile.pdf"} >
                            <Page pageNumber={1}  />
                          </Document>
                          <PdfViewer pdfUrl={"https://pdf-data1.s3.ap-south-1.amazonaws.com/pdf-data1/pdf/1715427188300/lorem-ipsum.pdf"} initialPage={1} />

                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                </div>
              </div> */}
              <div className="w-[100%] p-4 flex flex-col justify-between bg-[#F6F6F6] h-screen">
                <div className=" p-3 h-[40vh] bg-white rounded-2xl flex flex-col">
                  <div className="max-h-[25vh] overflow-y-auto text-base text-[#666D80]">
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum
                  </div>
                  <div className="mt-2 flex justify-center">
                  <FileUpload setSummaryState={setSummaryState} setPdfDataUrl={setPdfDataUrl} resetStateHndler={resetStateHndler} />
                  </div>
                </div>
                <div className="h-[60vh] mt-4 bg-white rounded-2xl flex flex-col">
               PDF
                </div>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </div>

      <ToastContainer />
    </>
  );
};

export default App;
