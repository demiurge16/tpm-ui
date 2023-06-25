import { useEffect, useState } from "react";
import { Button, FormControlLabel, List, ListItem, Popover, Switch, Typography } from "@mui/material";
import { ColumnDefinition } from "./GridProps";
import ViewColumnIcon from '@mui/icons-material/ViewColumn';

export interface ColumnPickerProps<Type> {
  columnDefinitions: ColumnDefinition<Type>[];
  onColumnDefinitionsChange: (columnDefinitions: ColumnDefinition<Type>[]) => void;
}

export const ColumnPicker = <Type extends any>(props: ColumnPickerProps<Type>) => {
  const [columnDefinitions, setColumnDefinitions] = useState<ColumnDefinition<Type>[]>(props.columnDefinitions);
  useEffect(() => {
    setColumnDefinitions(props.columnDefinitions);
  }, [props.columnDefinitions]);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenColumns = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseColumns = () => {
    setAnchorEl(null);
  };

  const handleColumnsChange = (columnDefinitions: ColumnDefinition<Type>[]) => {
    props.onColumnDefinitionsChange(columnDefinitions);
  };

  return (
    <>
      <Button variant="text" onClick={handleOpenColumns} sx={{ mb: 1 }}>
        <ViewColumnIcon sx={{ mr: 1 }} />
        <Typography variant="button">Columns</Typography>
      </Button>
      <Popover
        sx={{ p: 2 }}
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleCloseColumns}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        {
          <List>
            {
              columnDefinitions.map((column, index) => (
                <ListItem key={index} sx={{ pt: 0, pb: 0 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={column.hide !== true}
                        disabled={column.lockVisible || columnDefinitions.filter((column) => column.hide !== true).length === 1}
                        onChange={(event) => {
                          const newColumnDefinitions = [...columnDefinitions];
                          newColumnDefinitions[index] = { ...column, hide: !event.target.checked };
                          setColumnDefinitions(newColumnDefinitions);
                          handleColumnsChange(newColumnDefinitions);
                        }}
                      />
                    }
                    label={column.headerName}
                  />
                </ListItem>
              ))
            }
          </List>
        }
      </Popover>
    </>
  );
}