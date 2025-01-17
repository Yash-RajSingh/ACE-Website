import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import {
  Tr,
  Td,
  TableContainer,
  TableContainerTitle,
  TableContainerTable,
} from "../AchievementsElements"
import Loading from "../../animations/Loading"
import AnimateIn from "../../animations/AnimateIn"
import ProjectFilter from "../../projects/components/ProjectFilter"

const Table = ({ tableData, title, breakOn = "medium" }) => {
  const [filter, setFilter] = useState("Achievement")
  const [table, setTable] = useState(tableData)
  const [loading, setLoading] = useState(true)

  let tableClass = "table-container_table"

  if (breakOn === "small") {
    tableClass += "table-container__table--break-sm"
  } else if (breakOn === "medium") {
    tableClass += "table-container__table--break-md"
  } else if (breakOn === "large") {
    tableClass += "table-container__table--break-lg"
  }

  const tableHeader = [
    "Date",
    filter !== "Achievement" ? "Name" : "Winner Name",
    filter === "Achievement" && "Position",
    filter !== "Achievement" ? "Position" : "Event Name",
    filter !== "Achievement" ? "Company" : "College Name",
  ]

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      switch (filter) {
        case "Placement":
          const place = tableData.filter(e => e.type === "Placement")
          setTable(place)
          setLoading(false)
          break
        case "Internship":
          const intern = tableData.filter(e => e.type === "Internship")
          setTable(intern)
          setLoading(false)
          break
        case "Freelance":
          const freelance = tableData.filter(e => e.type === "Freelance")
          setTable(freelance)
          setLoading(false)
          break
        case "Achievement":
          const achieve = tableData.filter(e => e.type === "Achievement")
          setTable(achieve)
          setLoading(false)
          break
        default:
          setTable(tableData)
          setLoading(false)
      }
    }, 500)
  }, [filter, tableData])

  return (
    <AnimateIn>
      <TableContainer>
        <ProjectFilter
          categories={["Achievement", "Freelance", "Internship", "Placement"]}
          setState={setFilter}
        />
        <TableContainerTitle>
          <h2>{title}</h2>
          {!loading ? (
            <TableContainerTable>
              <thead>
                <Tr>
                  {tableHeader.map((col, index) => (
                    <th key={index}>{col}</th>
                  ))}
                </Tr>
              </thead>
              <tbody>
                {table?.map(
                  ({
                    event_date,
                    winner_name,
                    position,
                    event_name,
                    college_name,
                  }) => {
                    return (
                      <tr>
                        <Td>{event_date}</Td>
                        <Td>
                          {winner_name?.document?.data?.member_name?.text}
                        </Td>
                        <Td>{position ?? "-"}</Td>
                        <Td>{event_name.text}</Td>
                        <Td>{college_name.text}</Td>
                      </tr>
                    )
                  }
                )}
              </tbody>
            </TableContainerTable>
          ) : (
            <Loading />
          )}
        </TableContainerTitle>
      </TableContainer>
    </AnimateIn>
  )
}

Table.prototype = {
  tableData: PropTypes.arrayOf(PropTypes.object).isRequired,
  headingColumns: PropTypes.arrayOf(PropTypes.string).isRequired,
  title: PropTypes.string.isRequired,
  breakOn: PropTypes.oneOf(["small", "medium", "large"]),
}

export default Table
