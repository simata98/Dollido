import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Box from '@mui/material/Box';



export default function Dollidodetail() {
  const [tasks, setTasks] = useState([]);
  var dollidoimage = tasks.lstFilePathImg
  var dollidoimage2 = (dollidoimage||'').split("/").pop();
//   var workList= (data||'').split('.');
  useEffect(() => {
    const code2 = localStorage.getItem("code2");

    axios
      // lost112의 listitem를 받을려고 axios.get(url주소)로 요청함
      .get(`http://127.0.0.1:8000/post/${code2}`)
      .then(response => {
        setTasks(response.data);
        console.log(code2)
      });
  }, []);
  console.log(tasks)
  console.log(tasks.lstFilePathImg)
  console.log(tasks.lstFilePathImg)
//   const dollidoimage = tasks.lstFilePathImg.split("/").pop();
  return (
    
    <Box
      sx={{
        marginTop: 15,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Card
        sx={{
          maxWidth: '100%',
        }}
      >
        <CardHeader
          avatar={
            <Avatar alt={tasks.lstPrdtNm} src={dollidoimage2}>
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={'[' + tasks.lstPrdtNm + '] '} // 이름+카테고리
          subheader={'습득일자 : ' + tasks.lstYmd}// 년-월-일
        />
        <CardMedia
          component="img"
          height='100%'
          // image="/static/images/cards/paella.jpg"
          image={dollidoimage2} // 사진이미지
          alt="Paella dish"
        />
        <CardContent>
          <Typography variant="body2">
            {'보관장소 : ' + tasks.lstPlace}
            <br />
            <br />
            {tasks.lstcontent}
          </Typography>
        </CardContent>
        {/* <CardActions disableSpacing>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
          <IconButton aria-label="share">
            <IconButton
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Method:</Typography>
            <Typography paragraph>
              Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
              aside for 10 minutes.
            </Typography>
            <Typography paragraph>
              Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
              medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring
              occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a
              large plate and set aside, leaving chicken and chorizo in the pan. Add
              pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook,
              stirring often until thickened and fragrant, about 10 minutes. Add
              saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
            </Typography>
            <Typography paragraph>
              Add rice and stir very gently to distribute. Top with artichokes and
              peppers, and cook without stirring, until most of the liquid is absorbed,
              15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and
              mussels, tucking them down into the rice, and cook again without
              stirring, until mussels have opened and rice is just tender, 5 to 7
              minutes more. (Discard any mussels that don&apos;t open.)
            </Typography>
            <Typography>
              Set aside off of the heat to let rest for 10 minutes, and then serve.
            </Typography>
          </CardContent>
        </Collapse> */}
      </Card>
    </Box>
  );
}
