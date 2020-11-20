import React, {useState, useContext} from "react";
import Context from "../../context"
import { withStyles, createStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import AddAPhotoIcon from "@material-ui/icons/AddAPhotoTwoTone";
import LandscapeIcon from "@material-ui/icons/LandscapeOutlined";
import ClearIcon from "@material-ui/icons/Clear";
import SaveIcon from "@material-ui/icons/SaveTwoTone";

const CreatePin = ({ classes }) => {
  const [title, setTitle] = useState("")
  const [image, setImage] = useState("")
  const [content, setContent] = useState("")
  const {state, dispatch} = useContext(Context)
  const {draft} = state

  const handleSubmit = event => {
    event.preventDefault()
    console.log(title)
    console.log(image)
    console.log(content)
  }
  const handleDiscard = event => {
    setTitle("")
    setContent("")
    setImage("")
    dispatch({type:"DELETE_DRAFT"})
  }
  return (
    <form className = {classes.form}>
      <Typography
        className = {classes.alignCenter}
        noWrap
        component= "h2"
        variant = "h4"
        color = "secondary"
        >
          <LandscapeIcon className = {classes.iconLarge} /> Pin Location
      </Typography>
      <div>
        <TextField name = "title" label = "Title" placeholder = "Insert Pin Title" onChange = {e=>setTitle(e.target.value)}/>
        <input 
          accept = "image/*"
          id = "image"
          type = "file"
          className = {classes.input}
          onChange = {(e:React.FormEvent<HTMLInputElement>) => setImage(e.target.files[0])}
        />
        <label htmlFor="image">
          <Button
            component = "span"
            size = "small"
            className = {classes.button}
            style = {{color: image && "green"}}
          >
            <AddAPhotoIcon />
          </Button>
        </label>
      </div>
      <div className = {classes.contentField}>
        <TextField 
        name = "content"
        label = "Content"
        multiline 
        rows = "6"
        margin = "normal"
        fullWidth
        variant = "outlined"
        onChange = {e=>setContent(e.target.value)}
        />
      </div>
      <div>
        <Button className = {classes.button} variant = "contained" color = "primary" disabled = {draft? false:true} onClick = {handleDiscard}>
          <ClearIcon className = {classes.leftIcon}/>
          Discard
        </Button>
        <Button type="submit" className = {classes.button} variant = "contained" color = "secondary" disabled = {!title.trim() || !content.trim()} onClick = {handleSubmit}>
          <SaveIcon className = {classes.rightIcon}/>
          Submit 
        </Button>

      </div>
    </form>
  );
};

const styles = (theme:any) => createStyles({
  form: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    paddingBottom: theme.spacing.unit
  },
  contentField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: "95%"
  },
  input: {
    display: "none"
  },
  alignCenter: {
    display: "flex",
    alignItems: "center"
  },
  iconLarge: {
    fontSize: 40,
    marginRight: theme.spacing.unit
  },
  leftIcon: {
    fontSize: 20,
    marginRight: theme.spacing.unit
  },
  rightIcon: {
    fontSize: 20,
    marginLeft: theme.spacing.unit
  },
  button: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit,
    marginLeft: 0
  }
});

export default withStyles(styles)(CreatePin);