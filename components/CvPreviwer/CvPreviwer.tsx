import { useCV } from "@/context/Cv";
import React from "react";
import CircleRating from "./Rating";

const CvPreviwer = () => {
  const { dispatch, state } = useCV();
  const formatDate = (date: Date | string) => {
    if (date instanceof Date) {
      return date.toLocaleDateString(); // Customize this format as needed
    }
    return date || "N/A";
  };

  return (
    <div className=" flex justify-center items-center  flex-1">
      <div className="bg-white p-8   max-w-[70%] w-full min-h-[80%]">
        <div className=" flex gap-8">
          <div className=" flex-1">
            <div className="flex flex-col">
              <h1>
                {" "}
                {state.firstName} {state.lastName}
              </h1>

              <h3> {state.jobTitle}</h3>
            </div>
            <div>
              <h1 className="text-xl font-semibold">About Me</h1>
              {state.summary}
            </div>
            <br />
            <div className="">
              <div className="flex justify-between items-center mb-4">
                <div className="text-xl font-semibold">Employments</div>
              </div>

              {/* Employment Items List */}
              <div className="space-y-6">
                {state.employment.length > 0 ? (
                  state.employment.map((item, index) => (
                    <div key={index} className="border-b border-gray-200 pb-4">
                      {/* Item Header: Job Title and Company Name */}
                      <div className="flex justify-between items-center mb-2">
                        <div>
                          <div className="font-semibold text-lg">
                            {item.jobTitle}
                          </div>
                          <div className="text-sm text-gray-500">
                            {item.companyName}
                          </div>
                        </div>
                      </div>

                      {/* Item Details */}
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                          <div>
                            <div className="text-sm text-gray-500">
                              Start Date
                            </div>
                            <div className="font-medium">
                              {formatDate(item?.companyStartDate || "") ||
                                "N/A"}
                            </div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-500">
                              End Date
                            </div>
                            <div className="font-medium">
                              {item.isWorkingNow
                                ? "Present"
                                : formatDate(item?.companyEndDate || "") ||
                                  "N/A"}
                            </div>
                          </div>
                        </div>

                        <div>
                          <div className="text-sm text-gray-500">
                            Job Description
                          </div>

                          <div
                            className="font-medium"
                            dangerouslySetInnerHTML={{
                              __html:
                                item.description || "No description provided.",
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-gray-500">
                    No employment entries available.
                  </div>
                )}
              </div>
            </div>
            <br />
            <div className="">
              {/* Heading */}
              <h3 className="text-xl font-semibold">Education </h3>

              {/* Check if there are any education records */}
              {state.education.length === 0 ? (
                <div className="text-center text-gray-500">
                  No education records available.
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Education Card/List */}
                  {state.education.map((education, index) => (
                    <div key={index} className="">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <h2 className="text-xl font-semibold">
                            {education.unvName}
                          </h2>
                          <p className="text-md text-gray-600">
                            {education.degree}
                          </p>
                        </div>
                        <div className="sm:text-right">
                          <p className="text-md text-gray-500">
                            {education.graduationDate
                              ? formatDate(education.graduationDate)
                              : "N/A"}
                          </p>
                        </div>
                      </div>

                      {/* Description */}
                      <div className="mt-4">
                        <div
                          className="font-medium"
                          dangerouslySetInnerHTML={{
                            __html:
                              education.description ||
                              "No description provided.",
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex-1">
            <div>
              <h4>Contact</h4>
              <div>
                <h5>
                  {state.city} {state.country}
                </h5>
              </div>

              <div>
                <h5>{state.address}</h5>
              </div>
              <div>
                <h5>{state.phone}</h5>
              </div>
              <div>
                <h5>{state.email}</h5>
              </div>
            </div>

            <div>
              <h1 className="text-xl font-semibold">Techenical Skills</h1>

              {state.skills.map((skill, index) => (
                <div key={index} className="flex  justify-between">
                  <h6>{skill.label}</h6>
                  <CircleRating value={skill.value} />
                </div>
              ))}
            </div>

            <div className="">
              {/* Heading */}
              <h1 className="text-xl font-semibold">Certificates</h1>

              {/* Check if there are any certificates */}
              {state.certifacte.length === 0 ? (
                <div className="text-center text-gray-500">
                  No certificates available.
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Certificate Card/List */}
                  {state.certifacte.map((certificate, index) => (
                    <div key={index} className="">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <h2 className="text-xl font-semibold">
                            {certificate.certifacteName}
                          </h2>
                          <div
                            className="font-medium"
                            dangerouslySetInnerHTML={{
                              __html:
                                certificate.description ||
                                "No description provided.",
                            }}
                          />
                        </div>
                        <div className="sm:text-right">
                          <p className="text-md text-gray-500">
                            {certificate.finishDate
                              ? formatDate(certificate.finishDate)
                              : "N/A"}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CvPreviwer;
