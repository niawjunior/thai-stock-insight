"use client"
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Divider,
  Link,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material"
import { useGetStockSectorsQuery } from "../redux/services/stockApi"
import SearchInput from "./Search"
import { useState } from "react"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
export default function HomeComponent() {
  const { data: stockSectors, isLoading } = useGetStockSectorsQuery()

  const [expanded, setExpanded] = useState<string | false>(false)

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false)
    }
  console.log(stockSectors)
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <SearchInput
        onSubmit={(value: string) => {
          console.log(value)
        }}
      />
      {!isLoading && (
        <>
          <Box sx={{ paddingTop: "20px" }}>
            <Typography variant="h6" sx={{ color: "text.primary" }}>
              SET Industry Group and Sector Index
            </Typography>
            <Box
              sx={{
                marginLeft: "30%",
                display: "grid",
                gridTemplateColumns: "100px 100px 100px 150px 150px",
                gap: 1,
              }}
            >
              <Typography
                variant="subtitle2"
                sx={{ color: "text.primary", textAlign: "right" }}
              >
                Last
              </Typography>
              <Typography
                variant="subtitle2"
                sx={{ color: "text.primary", textAlign: "right" }}
              >
                Change
              </Typography>
              <Typography
                variant="subtitle2"
                sx={{ color: "text.primary", textAlign: "right" }}
              >
                % Change
              </Typography>
              <Typography
                variant="subtitle2"
                sx={{ color: "text.primary", textAlign: "right" }}
              >
                Volume (Shares)
              </Typography>
              <Typography
                variant="subtitle2"
                sx={{ color: "text.primary", textAlign: "right" }}
              >
                {`Value ('000 Baht)`}
              </Typography>
            </Box>
            {stockSectors?.map((sector) => (
              <Accordion
                key={sector.name}
                expanded={expanded === `panel${sector.name}`}
                onChange={handleChange(`panel${sector.name}`)}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  <Box sx={{ minWidth: "30%", display: "grid", gap: 1 }}>
                    <Typography>{sector.name}</Typography>
                    <Typography sx={{ color: "text.secondary" }}>
                      {sector.detail}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "grid",
                      gridAutoFlow: "column",
                      gridTemplateColumns: "100px 100px 100px 150px 150px",
                      gap: 1,
                    }}
                  >
                    {sector.cellData.map((value) => {
                      if (value.key === "symbol") {
                        return
                      }

                      return (
                        <Typography
                          key={value.key}
                          sx={{
                            color: value.value.startsWith("-")
                              ? "#ff3d00"
                              : value.value.startsWith("+")
                              ? "#00e676"
                              : "text.primary",
                            flexShrink: 0,
                            ml: 1,
                            textAlign: "right",
                          }}
                        >
                          {value.value}
                        </Typography>
                      )
                    })}
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <List
                    sx={{
                      width: "100%",
                      bgcolor: "background.paper",
                      padding: "1rem",
                    }}
                  >
                    {sector.children.map((value) => (
                      <Box key={value.name} sx={{ display: "flex" }}>
                        <Link
                          target="_blank"
                          key={value.name}
                          href={"https://www.set.or.th" + value.url}
                          sx={{
                            textDecoration: "none",
                            minWidth: "30%",
                          }}
                        >
                          <ListItem key={value.name} disableGutters>
                            <ListItemText
                              primary={value.name}
                              secondary={value.detail}
                            />
                          </ListItem>
                        </Link>

                        <Box
                          sx={{
                            display: "grid",
                            gridAutoFlow: "column",
                            gridTemplateColumns:
                              "100px 100px 100px 150px 150px",
                            gap: 1,
                            marginLeft: "-16px",
                          }}
                        >
                          {value.cellData.map((value) => {
                            if (value.key === "symbol") {
                              return
                            }

                            return (
                              <Typography
                                key={value.key}
                                sx={{
                                  color: value.value.startsWith("-")
                                    ? "#ff3d00"
                                    : value.value.startsWith("+")
                                    ? "#00e676"
                                    : "text.primary",
                                  flexShrink: 0,
                                  ml: 1,
                                  textAlign: "right",
                                }}
                              >
                                {value.value}
                              </Typography>
                            )
                          })}
                        </Box>
                      </Box>
                    ))}
                  </List>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        </>
      )}
    </Box>
  )
}
