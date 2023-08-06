"use client";

import { useRef, useState } from "react";

const matchData = {
  day: "sunday",
  date: new Date(),
  match_num: 1,
  groupA: true,
  groupB: false,
  groupC: true,
  teams: [
    {
      team_id: 101,
      team_name: "SOUL",
      matches: 0,
      wins: 0,
      normal_finishes: 0,
      bonus_finishes: 0,
      finish_points: 0,
      placement_points: 0,
      total: 0,
      fixed: false,
    },
    {
      team_id: 102,
      team_name: "GODLIKE",
      matches: 0,
      wins: 0,
      normal_finishes: 0,
      bonus_finishes: 0,
      finish_points: 0,
      placement_points: 0,
      total: 0,
      fixed: false,
    },
    {
      team_id: 103,
      team_name: "TX",
      matches: 0,
      wins: 0,
      normal_finishes: 0,
      bonus_finishes: 0,
      finish_points: 0,
      placement_points: 0,
      total: 0,
      fixed: false,
    },
  ],
};
const Table = () => {
  const [tableData, setTableData] = useState(matchData.teams);
  const [inputOpen, setInputOpen] = useState<any>({
    index: -1,
    finishes_input: false,
    bonus_finishes_input: false,
  });
  const dragIndex = useRef<any>(null);
  const dragOverIndex = useRef<any>(null);

  const getPlacementPoints = (rank: number) => {
    switch (rank) {
      case 0:
        return 15;
      case 1:
        return 12;
      case 2:
        return 10;
      case 3:
        return 8;
      case 4:
        return 6;
      case 5:
        return 4;
      case 6:
        return 2;
      case 7:
      case 8:
      case 9:
      case 10:
      case 11:
        return 1;
      default:
        return 0;
    }
  };
  const prepareTable = () => {
    const draggedData = [...tableData];
    const draggedItem = draggedData.splice(dragIndex.current, 1)[0];
    draggedItem.fixed = true;
    draggedData.splice(dragOverIndex.current, 0, draggedItem);
    draggedData.forEach((team, index: number) => {
      team.placement_points = getPlacementPoints(index);
      team.finish_points = team.normal_finishes + team.bonus_finishes * 2;
      team.total = team.placement_points + team.finish_points;
    });
    setTableData(draggedData);
    setInputOpen({
      index: -1,
      finishes_input: false,
      bonus_finishes_input: false,
    });
    dragIndex.current = null;
    dragOverIndex.current = null;
  };

  const handleFinish = (e, teamId: any, key: any) => {
    const foundTeam = tableData.find((team) => team.team_id === teamId);
    if (e.target.value >= 0 && foundTeam) {
      foundTeam[key] = +e.target.value;
      foundTeam.total =
        foundTeam.placement_points +
        foundTeam.normal_finishes +
        foundTeam.bonus_finishes * 2;
      setTableData(
        tableData.map((team) => (team.team_id === teamId ? foundTeam : team))
      );
    }
  };
  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-2 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full text-left text-sm font-light">
              <thead className="border-b font-medium dark:border-neutral-500">
                <tr>
                  <th scope="col" className="px-2 py-4">
                    #
                  </th>
                  <th scope="col" className="px-2 py-4">
                    TEAMS
                  </th>
                  <th scope="col" className="px-2 py-4">
                    Normal Finishes
                  </th>
                  <th scope="col" className="px-2 py-4">
                    Bonus Finishes
                  </th>
                  <th scope="col" className="px-2 py-4">
                    PP
                  </th>
                  <th scope="col" className="px-2 py-4">
                    T
                  </th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((team, index: number) => (
                  <tr
                    key={team.team_id}
                    className={`${
                      team.fixed ? "bg-green-100" : ""
                    } border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600`}
                    draggable
                    onDragStart={(e) => (dragIndex.current = index)}
                    onDragEnter={(e) => (dragOverIndex.current = index)}
                    onDragOver={(e) => e.preventDefault()}
                    onDragEnd={prepareTable}
                  >
                    <td className="whitespace-nowrap px-2 py-4 font-medium">
                      <svg className="svg-icon" viewBox="0 0 20 20">
                        <path
                          fill="none"
                          d="M3.314,4.8h13.372c0.41,0,0.743-0.333,0.743-0.743c0-0.41-0.333-0.743-0.743-0.743H3.314
								c-0.41,0-0.743,0.333-0.743,0.743C2.571,4.467,2.904,4.8,3.314,4.8z M16.686,15.2H3.314c-0.41,0-0.743,0.333-0.743,0.743
								s0.333,0.743,0.743,0.743h13.372c0.41,0,0.743-0.333,0.743-0.743S17.096,15.2,16.686,15.2z M16.686,9.257H3.314
								c-0.41,0-0.743,0.333-0.743,0.743s0.333,0.743,0.743,0.743h13.372c0.41,0,0.743-0.333,0.743-0.743S17.096,9.257,16.686,9.257z"
                        ></path>
                      </svg>
                    </td>
                    <td className="whitespace-nowrap px-2 py-4">
                      {team.team_name}
                    </td>
                    <td className="whitespace-nowrap px-2 py-4 flex">
                      {!(
                        inputOpen.finishes_input && inputOpen.index == index
                      ) ? (
                        <>
                          <span className="mr-1">
                            {team.normal_finishes || 0}
                          </span>
                          <span>
                            <svg
                              className="svg-icon"
                              viewBox="0 0 20 20"
                              onClick={() =>
                                setInputOpen((prevInp: any) => ({
                                  ...prevInp,
                                  index: index,
                                  finishes_input: true,
                                  bonus_finishes_input: false,
                                }))
                              }
                            >
                              <path
                                fill="none"
                                d="M19.404,6.65l-5.998-5.996c-0.292-0.292-0.765-0.292-1.056,0l-2.22,2.22l-8.311,8.313l-0.003,0.001v0.003l-0.161,0.161c-0.114,0.112-0.187,0.258-0.21,0.417l-1.059,7.051c-0.035,0.233,0.044,0.47,0.21,0.639c0.143,0.14,0.333,0.219,0.528,0.219c0.038,0,0.073-0.003,0.111-0.009l7.054-1.055c0.158-0.025,0.306-0.098,0.417-0.211l8.478-8.476l2.22-2.22C19.695,7.414,19.695,6.941,19.404,6.65z M8.341,16.656l-0.989-0.99l7.258-7.258l0.989,0.99L8.341,16.656z M2.332,15.919l0.411-2.748l4.143,4.143l-2.748,0.41L2.332,15.919z M13.554,7.351L6.296,14.61l-0.849-0.848l7.259-7.258l0.423,0.424L13.554,7.351zM10.658,4.457l0.992,0.99l-7.259,7.258L3.4,11.715L10.658,4.457z M16.656,8.342l-1.517-1.517V6.823h-0.003l-0.951-0.951l-2.471-2.471l1.164-1.164l4.942,4.94L16.656,8.342z"
                              ></path>
                            </svg>
                          </span>
                        </>
                      ) : (
                        <>
                          <input
                            type="number"
                            className="mr-1 w-8"
                            onChange={(e) =>
                              handleFinish(e, team.team_id, "normal_finishes")
                            }
                            min={0}
                            max={60 - team.bonus_finishes}
                          />
                          <svg
                            className="svg-icon"
                            viewBox="0 0 20 20"
                            onClick={() =>
                              setInputOpen((prevInp: any) => ({
                                index: -1,
                                finishes_input: false,
                                bonus_finishes_input: false,
                              }))
                            }
                          >
                            <path
                              fill="none"
                              d="M7.629,14.566c0.125,0.125,0.291,0.188,0.456,0.188c0.164,0,0.329-0.062,0.456-0.188l8.219-8.221c0.252-0.252,0.252-0.659,0-0.911c-0.252-0.252-0.659-0.252-0.911,0l-7.764,7.763L4.152,9.267c-0.252-0.251-0.66-0.251-0.911,0c-0.252,0.252-0.252,0.66,0,0.911L7.629,14.566z"
                            ></path>
                          </svg>
                        </>
                      )}
                    </td>
                    <td className="whitespace-nowrap px-2 py-4">
                      {!(
                        inputOpen.bonus_finishes_input &&
                        inputOpen.index == index
                      ) ? (
                        <span className="flex">
                          <span className="mr-1">
                            {team.bonus_finishes || 0}
                          </span>
                          <svg
                            className="svg-icon"
                            viewBox="0 0 20 20"
                            onClick={() =>
                              setInputOpen((prevInp: any) => ({
                                ...prevInp,
                                index: index,
                                bonus_finishes_input: true,
                              }))
                            }
                          >
                            <path
                              fill="none"
                              d="M19.404,6.65l-5.998-5.996c-0.292-0.292-0.765-0.292-1.056,0l-2.22,2.22l-8.311,8.313l-0.003,0.001v0.003l-0.161,0.161c-0.114,0.112-0.187,0.258-0.21,0.417l-1.059,7.051c-0.035,0.233,0.044,0.47,0.21,0.639c0.143,0.14,0.333,0.219,0.528,0.219c0.038,0,0.073-0.003,0.111-0.009l7.054-1.055c0.158-0.025,0.306-0.098,0.417-0.211l8.478-8.476l2.22-2.22C19.695,7.414,19.695,6.941,19.404,6.65z M8.341,16.656l-0.989-0.99l7.258-7.258l0.989,0.99L8.341,16.656z M2.332,15.919l0.411-2.748l4.143,4.143l-2.748,0.41L2.332,15.919z M13.554,7.351L6.296,14.61l-0.849-0.848l7.259-7.258l0.423,0.424L13.554,7.351zM10.658,4.457l0.992,0.99l-7.259,7.258L3.4,11.715L10.658,4.457z M16.656,8.342l-1.517-1.517V6.823h-0.003l-0.951-0.951l-2.471-2.471l1.164-1.164l4.942,4.94L16.656,8.342z"
                            ></path>
                          </svg>
                        </span>
                      ) : (
                        <span className="flex">
                          <input
                            type="number"
                            className="mr-1 w-8"
                            onChange={(e) =>
                              handleFinish(e, team.team_id, "bonus_finishes")
                            }
                            min={0}
                            max={60 - team.normal_finishes}
                          />
                          <svg
                            className="svg-icon"
                            viewBox="0 0 20 20"
                            onClick={() =>
                              setInputOpen((prevInp: any) => ({
                                index: -1,
                                bonus_finishes_input: false,
                                finishes_input: false,
                              }))
                            }
                          >
                            <path
                              fill="none"
                              d="M7.629,14.566c0.125,0.125,0.291,0.188,0.456,0.188c0.164,0,0.329-0.062,0.456-0.188l8.219-8.221c0.252-0.252,0.252-0.659,0-0.911c-0.252-0.252-0.659-0.252-0.911,0l-7.764,7.763L4.152,9.267c-0.252-0.251-0.66-0.251-0.911,0c-0.252,0.252-0.252,0.66,0,0.911L7.629,14.566z"
                            ></path>
                          </svg>
                        </span>
                      )}
                    </td>
                    <td className="whitespace-nowrap px-2 py-4">
                      {team.placement_points || 0}
                    </td>
                    <td className="whitespace-nowrap px-2 py-4">
                      {team.total || 0}
                    </td>
                    <td className="whitespace-nowrap px-2 py-4">
                      <input
                        className={`${
                          team.fixed ? "bg-red-500" : ""
                        } mr-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-neutral-300 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-neutral-600 dark:after:bg-neutral-400 dark:checked:bg-primary dark:checked:after:bg-primary dark:focus:before:shadow-[3px_-1px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca]`}
                        type="checkbox"
                        role="switch"
                        id="flexSwitchCheckDefault"
                        checked={team.fixed}
                      />
                      <label
                        className="inline-block pl-[0.15rem] hover:cursor-pointer"
                        htmlFor="flexSwitchCheckDefault"
                      >
                        Position fixed
                      </label>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
