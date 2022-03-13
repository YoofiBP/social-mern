import React from 'react';
import {Card, makeStyles, Typography, CardMedia, CardContent} from "@material-ui/core";
import Menu from "../components/Menu";


export const useStyles = makeStyles(theme => ({
    card: {
        maxWidth: 600,
        margin: 'auto',
        marginTop: theme.spacing(5)
    },
    title: {
        padding: `${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(2)}px`,
        color: theme.palette.openTitle
    },
    media: {
        minHeight: 400
    }
}))

const Home = () => {
    const classes = useStyles();

    return (
        <>
            <Menu/>
            <Card className={classes.card}>
                <Typography variant={"h6"} className={classes.title}>
                    MERN Skeleton
                </Typography>
                <CardMedia className={classes.media} component={'img'} src={'https://picsum.photos/id/237/200/300'}
                           title={'Bicycle'}/>

                <CardContent>
                    <Typography variant={'body2'} component={'p'}>
                        Welcome to the MERN skeleton home page
                    </Typography>
                </CardContent>
            </Card>
        </>
    )
}

export default Home;