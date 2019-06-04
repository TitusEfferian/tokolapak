import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  card: {
    maxWidth: 345,
    marginTop: 16,
  },
  media: {
    height: 140,
  },
});

export default function MediaCard({ name, image, from, price }) {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image={image}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {name}
          </Typography>
          <Typography variant="body2" color="textPrimary" component="p">
            {price}
          </Typography>
        </CardContent>
      <CardActions>
        <Button size="small" color="primary">
          Go To {from}
        </Button>
      </CardActions>
    </Card>
  );
}