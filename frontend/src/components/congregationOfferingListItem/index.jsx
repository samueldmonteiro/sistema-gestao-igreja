import React, { useState } from 'react';
import { Card, CardContent, Typography, Grid, Box } from '@mui/material';
import formatDate from '../../utils/formatDate';
import formatValueToBRL from '../../utils/formatValueToBRL';
import { AttachMoney, Place, DateRange } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import { deleteCongregationOffering } from '../../services/congregationOfferingService';

const ITEM_HEIGHT = 40;

// Styled Components
const AnimatedBox = styled(motion.div)`
  margin-bottom: 16px;
  border-radius: 8px;
  overflow: hidden;
`;

const CongregationOfferingListItem = ({ offering, setOfferings, offerings, setCountOfferings }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const deleteOffering = (id) => {
        deleteCongregationOffering(id);
        setOfferings(prevOfferings => prevOfferings.filter(of => of.id !== id));
        setCountOfferings(prev=> prev -1);
        handleClose();
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <AnimatePresence>
            <AnimatedBox
                key={offering.id}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0, marginBottom: 0, transition: { duration: 0.3 } }}
            >
                <Card sx={{ minWidth: 275, boxShadow: 2, border: '1px solid #e0e0e0', position: 'relative' }}>
                    <div style={{ right: 0, position: 'absolute', marginTop: '5px' }}>
                        <IconButton
                            aria-label="more"
                            id="long-button"
                            aria-controls={open ? 'long-menu' : undefined}
                            aria-expanded={open ? 'true' : undefined}
                            aria-haspopup="true"
                            onClick={handleClick}
                        >
                            <MoreVertIcon />
                        </IconButton>
                        <Menu
                            id="long-menu"
                            MenuListProps={{
                                'aria-labelledby': 'long-button',
                            }}
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            slotProps={{
                                paper: {
                                    style: {
                                        maxHeight: ITEM_HEIGHT * 4.5,
                                        width: '12ch',
                                    },
                                },
                            }}
                        >
                            <MenuItem onClick={() => deleteOffering(offering.id)}>
                                <DeleteIcon color='error' sx={{ marginRight: '5px', fontSize: '20px' }} /> Deletar
                            </MenuItem>
                        </Menu>
                    </div>
                    <CardContent>
                        <Grid container spacing={2}>
                            {[
                                { icon: <AttachMoney sx={{ fontSize: '22px' }} />, label: 'Valor da oferta', value: formatValueToBRL(offering.value) },
                                { icon: <Place sx={{ fontSize: '22px' }} />, label: 'Congregação', value: offering?.congregation?.name ?? 'Congregação removida' },
                                { icon: <DateRange sx={{ fontSize: '22px' }} />, label: 'Data', value: formatDate(offering.date) }
                            ].map((item, index) => (
                                <Grid key={index} item xs={12} sm={6}>
                                    <Box display="flex" alignItems="center">
                                        <Box sx={{ color: 'text.secondary', marginRight: 1, display: 'flex', alignItems: 'center' }}>
                                            {item.icon}
                                        </Box>
                                        <Box>
                                            <Typography variant="subtitle1" color="textSecondary">
                                                {item.label}
                                            </Typography>
                                            <Typography fontSize={17} variant="h6" component="div" fontWeight="550">
                                                {item.value}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Grid>
                            ))}
                        </Grid>
                    </CardContent>
                </Card>
            </AnimatedBox>
        </AnimatePresence>
    );
};

export default CongregationOfferingListItem;
