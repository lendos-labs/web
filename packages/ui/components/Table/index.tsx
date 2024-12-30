'use client';

import Collapse from '@mui/material/Collapse';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import React, { Fragment, ReactNode, useState } from 'react';
import { Box, Button, Divider, useMediaQuery, useTheme } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { NoContent } from '../NoContent';

export interface TableHeadProperties {
  key: string;
  title: string | ReactNode;
  sortKey?: string;
  style?: Record<string, string>;
  mobileHide?: boolean;
}

interface HeaderRowProps extends SortProps {
  header: TableHeadProperties[];
}

interface SortProps {
  sortName?: string;
  sortDesc?: boolean;
  setSortName?: (value: string) => void;
  setSortDesc?: (value: boolean) => void;
}

export type TableData = Record<string, React.ReactNode | string> & {
  collapsibleData?: Record<string, React.ReactNode | string>[];
};

export interface CollapsibleTableProps {
  header: TableHeadProperties[];
  data: TableData[];
  collapsibleHeader?: TableHeadProperties[];
  heightRow?: number;
  paddingColl?: number;
}

const getAlign = (index: number, arr: TableHeadProperties[]) => {
  if (index === 0) {
    return 'left';
  } else if (index === arr.length - 1) {
    return 'right';
  } else {
    return 'center';
  }
};

const getContentPosition = (index: number, arr: TableHeadProperties[]) => {
  if (index === 0) {
    return 'flex-start';
  } else if (index === arr.length - 1) {
    return 'flex-end';
  } else {
    return 'center';
  }
};

const HeaderRow = ({ header, sortName, sortDesc, setSortDesc, setSortName }: HeaderRowProps) => {
  const theme = useTheme();

  const handleSorting = (name: string) => {
    setSortDesc?.(false);
    setSortName?.(name);
    if (sortName === name) {
      setSortDesc?.(!sortDesc);
    }
  };

  return (
    <TableRow>
      {header.map((i, index, arr) => {
        return (
          <TableCell
            key={i.key}
            align={getAlign(index, arr)}
            sx={{
              py: '14px',
              px: '3px',
              borderBottomWidth: '1px',
              borderColor: 'border.grey',
              flex: '1 1 0%',
              minWidth: '50px',
              maxWidth: '280px',
              ...i.style,
            }}
          >
            <Typography
              variant='h3'
              color={theme.palette.mode === 'light' ? 'text.primary' : 'text.secondary'}
              sx={{
                cursor: i.sortKey ? 'pointer' : 'default',
                display: 'inline-flex',
                alignItems: 'center',
                userSelect: 'none',
              }}
              onClick={() => !!i.sortKey && handleSorting(i.sortKey)}
            >
              {i.title}

              {!!i.sortKey && (
                <Box sx={{ display: 'inline-flex', flexDirection: 'column', ml: 1 }}>
                  <Box
                    component='span'
                    sx={theme => ({
                      width: 0,
                      height: 0,
                      borderStyle: 'solid',
                      borderWidth: '0 4px 4px 4px',
                      borderColor: `transparent transparent ${
                        sortName === i.sortKey && sortDesc
                          ? theme.palette.divider
                          : theme.palette.text.dark
                      } transparent`,
                      mb: 0.5,
                    })}
                  />
                  <Box
                    component='span'
                    sx={theme => ({
                      width: 0,
                      height: 0,
                      borderStyle: 'solid',
                      borderWidth: '4px 4px 0 4px',
                      borderColor: `${
                        sortName === i.sortKey && !sortDesc
                          ? theme.palette.divider
                          : theme.palette.text.dark
                      } transparent transparent transparent`,
                    })}
                  />
                </Box>
              )}
            </Typography>
          </TableCell>
        );
      })}
    </TableRow>
  );
};

const DetailTable = ({
  open,
  collapsibleHeader,
  collapsibleData,
}: {
  open: boolean;
  collapsibleHeader: TableHeadProperties[];
  collapsibleData: TableData['collapsibleData'];
}) => {
  const theme = useTheme();
  return (
    <TableRow>
      <TableCell sx={{ padding: 0, borderWidth: '0px' }} colSpan={collapsibleHeader.length}>
        <Collapse in={open} timeout='auto' unmountOnExit>
          <Table
            size='small'
            aria-label='purchases'
            sx={{
              backgroundColor: 'background.collapse',
            }}
          >
            <TableHead sx={{ px: 0 }}>
              <TableRow sx={{ bgcolor: 'background.default' }}>
                {collapsibleHeader.map((i, cIndex, carr) => (
                  <TableCell
                    key={i.key}
                    sx={{
                      py: '14px',
                      pl: '12px',
                      pr: '20px',
                      borderWidth: '0px',
                    }}
                    align={getAlign(cIndex, carr)}
                  >
                    <Typography
                      variant='h3'
                      color={theme.palette.mode === 'light' ? 'text.primary' : 'text.secondary'}
                    >
                      {i.title}
                    </Typography>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {(collapsibleData ?? []).map((i, index) => (
                <TableRow key={index}>
                  {collapsibleHeader.map((h, cIndex, carr) => (
                    <TableCell
                      key={h.key}
                      sx={{
                        borderWidth: '0px',
                        height: '77px',
                        px: '12px',
                        py: 0,
                      }}
                      align={getAlign(cIndex, carr)}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: getContentPosition(cIndex, carr),
                        }}
                      >
                        {i[h.key]}
                      </Box>
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Collapse>
      </TableCell>
    </TableRow>
  );
};

const Row = ({
  row,
  header,
  collapsibleHeader,
  heightRow,
  paddingColl,
}: {
  row: CollapsibleTableProps['data'][0];
  header: CollapsibleTableProps['header'];
  collapsibleHeader: CollapsibleTableProps['collapsibleHeader'];
  heightRow: number;
  paddingColl: number;
}) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Fragment>
      <TableRow
        sx={{
          height: heightRow,
          pl: '12px',
          pr: '16px',
          py: 0,

          '&:last-child .MuiTableCell-root': {
            border: 'none',
          },

          '.MuiTableCell-root': {
            height: '10px',
            minHeight: '10px',
          },
        }}
      >
        {(collapsibleHeader ? header.filter(i => i.key !== 'actions') : header).map(
          (h, hIndex, hArr) => (
            <TableCell key={h.key} sx={{ padding: paddingColl }} align={getAlign(hIndex, hArr)}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: getContentPosition(hIndex, hArr),
                  color: 'text.secondary',
                }}
              >
                {row[h.key]}
              </Box>
            </TableCell>
          ),
        )}
        {collapsibleHeader && (
          <TableCell sx={{ borderWidth: '1px' }} align='right'>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              <Button
                onClick={() => setOpen(state => !state)}
                variant='white'
                size={'small'}
                sx={{ width: '90px' }}
              >
                Details
                <KeyboardArrowDownIcon
                  sx={{
                    color: 'text.dark',
                    transform: `rotate(${open ? 180 : 0}deg)`,
                    transition: 'transform 0.3s ease',
                  }}
                />
              </Button>
            </Box>
          </TableCell>
        )}
      </TableRow>
      {collapsibleHeader && (
        <DetailTable
          collapsibleHeader={collapsibleHeader}
          open={open}
          collapsibleData={row.collapsibleData}
        />
      )}
    </Fragment>
  );
};

const MobileDetailItem = ({
  open,
  idx,
  collapsibleHeader,
  collapsibleData,
}: {
  open: boolean;
  idx: number;
  collapsibleHeader: TableHeadProperties[];
  collapsibleData: TableData['collapsibleData'];
}) => {
  return (
    <Collapse in={open} timeout='auto' unmountOnExit>
      {idx !== 0 && (
        <Divider
          sx={{
            height: '1px',
            mt: 8,
            borderColor: theme => theme.palette.border.grey,
          }}
        />
      )}
      {(collapsibleData ?? []).map((i, index) => {
        return (
          <Box
            key={index}
            sx={{
              backgroundColor: 'background.default',
              px: 2,
              py: 3,
              mt: 8,
              display: 'flex',
              flexDirection: 'column',
              gap: 3,
            }}
          >
            {collapsibleHeader.map(h => (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  gap: 3,
                }}
                key={h.key}
              >
                {h.title && <Typography variant='h3'>{h.title}</Typography>}
                {i[h.key]}
              </Box>
            ))}
          </Box>
        );
      })}
    </Collapse>
  );
};

const MobileItem = ({
  row,
  header,
  collapsibleHeader,
  idx,
}: {
  row: CollapsibleTableProps['data'][0];
  header: CollapsibleTableProps['header'];
  collapsibleHeader: CollapsibleTableProps['collapsibleHeader'];
  idx: number;
}) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <Box
        sx={{
          py: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
          borderTop: '1px solid',
          pt: 4,
          pb: 6,
          borderColor: theme => theme.palette.border.grey,
        }}
      >
        {(collapsibleHeader ? header.filter(i => i.key !== 'actions') : header).map(h => (
          <Box
            key={h.key}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              color: 'text.secondary',
              width: '100%',
              px: 4,
            }}
          >
            {h.title === '' ||
              (!h.mobileHide && (
                <Typography
                  sx={{
                    flex: 1,
                  }}
                  variant='h3'
                  color='text.dark'
                >
                  {h.title}
                </Typography>
              ))}
            <Box
              sx={
                !h.title
                  ? {
                      flex: 1,
                    }
                  : {}
              }
            >
              {row[h.key]}
            </Box>
          </Box>
        ))}
        {collapsibleHeader && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <Button
              onClick={() => setOpen(state => !state)}
              variant='white'
              size={'small'}
              sx={{ width: '100%', justifyContent: 'space-between' }}
            >
              Details
              <KeyboardArrowDownIcon
                sx={{
                  color: 'text.dark',
                  transform: `rotate(${open ? 180 : 0}deg)`,
                  transition: 'transform 0.3s ease',
                }}
              />
            </Button>
          </Box>
        )}
      </Box>
      {collapsibleHeader && (
        <MobileDetailItem
          collapsibleHeader={collapsibleHeader}
          open={open}
          collapsibleData={row.collapsibleData}
          idx={idx}
        />
      )}
    </>
  );
};

export const CustomTable = ({
  header,
  collapsibleHeader,
  data,
  heightRow = 84,
  paddingColl = 4,
}: CollapsibleTableProps) => {
  const { breakpoints } = useTheme();
  const md = useMediaQuery(breakpoints.down('md'));

  const [sortName, setSortName] = useState<TableHeadProperties['sortKey']>('');
  const [sortDesc, setSortDesc] = useState(false);

  const sortData = sortName
    ? data.toSorted((a, b) => {
        const aValue = a[sortName];
        const bValue = b[sortName];

        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return sortDesc ? bValue.localeCompare(aValue) : aValue.localeCompare(bValue); // Для рядків
        }

        if (typeof aValue === 'number' && typeof bValue === 'number') {
          return sortDesc ? bValue - aValue : aValue - bValue; // Для чисел
        }

        return 0; // Якщо типи не співпадають, не змінюємо порядок
      })
    : data;

  if (!data.length) {
    return <NoContent text='Empty list' />;
  }

  return md ? (
    <Box>
      {sortData.map((row, index) => (
        <MobileItem
          key={index}
          row={row}
          header={header}
          collapsibleHeader={collapsibleHeader}
          idx={index}
        />
      ))}
    </Box>
  ) : (
    <TableContainer sx={{ px: 4 }}>
      <Table aria-label='collapsible table'>
        <TableHead>
          <HeaderRow
            header={header}
            sortName={sortName}
            sortDesc={sortDesc}
            setSortName={setSortName}
            setSortDesc={setSortDesc}
          />
        </TableHead>
        <TableBody>
          {sortData.map((row, index) => (
            <Row
              key={index}
              row={row}
              header={header}
              collapsibleHeader={collapsibleHeader}
              heightRow={heightRow}
              paddingColl={paddingColl}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
