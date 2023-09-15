"use client"

import {experimental_useFormStatus as useFormStatus} from "react-dom"
export default function MyButton(){
  const {pending}= useFormStatus();
  return (<button disabled={pending} type="submit" className=" myBtn btn btn-primary">
  Submit
</button>);
}