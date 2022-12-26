import * as React from 'react';
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

export default function MaterialUIPickers() {
    const [value, setValue] = React.useState(dayjs('2022-01-01T21:11:54'));

    const handleChange = (newValue) => {
        setValue(newValue);
    };

    return (
        <React.Fragment>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Container fixed>
                    <Box
                        sx={{
                            marginTop: 30, marginLeft: 30
                        }}
                    >
                        <DatePicker
                            label="Date desktop"
                            // inputFormat="MM/DD/YYYY"
                            inputFormat="YYYY/MM/DD"
                            value={value}
                            onChange={handleChange}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </Box>
                </Container>
            </LocalizationProvider>
        </React.Fragment >
    );
}