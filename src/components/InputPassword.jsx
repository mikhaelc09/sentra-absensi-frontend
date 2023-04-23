import { useState } from "react"
import { InputGroup, Input, InputRightElement, Button } from "@chakra-ui/react"
import { HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi'

function InputPassword(props) {
    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)
  
    return (
      <InputGroup size='md'>
        <Input
          type={show ? 'text' : 'password'}
          name={props.name}
        />
        <InputRightElement className="mr-2">
          <span onClick={handleClick}>
            {show ? <HiOutlineEyeOff className="text-xl" /> : <HiOutlineEye className="text-xl" /> }
          </span>
        </InputRightElement>
      </InputGroup>
    )
}

export default InputPassword