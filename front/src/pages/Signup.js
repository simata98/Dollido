import React, { useState } from 'react';
import axios from "axios";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default function Signup() {
    let [inputName, setInputName] = useState("");
    let [inputEmail, setInputEmail] = useState("");
    let [inputPw, setInputPw] = useState("");
    let [inputPwValidate, setInputPwValidate] = useState("");
    let [inputTel, setInputTel] = useState("");
    let [inputAddress, setInputAddress] = useState("");

    //오류메시지 상태저장
    const [nameMessage, setNameMessage] = useState('')
    const [emailMessage, setEmailMessage] = useState('')
    const [passwordMessage, setPasswordMessage] = useState('')
    const [passwordConfirmMessage, setPasswordConfirmMessage] = useState('')
    const [telMessage, setTelMessage] = useState("")
    const [addressMessage, setAddressMessage] = useState('')

    // 유효성 검사
    const [isName, setIsName] = useState(true)
    const [isEmail, setIsEmail] = useState(true)
    const [isPassword, setIsPassword] = useState(true)
    const [isPasswordConfirm, setIsPasswordConfirm] = useState(true)
    const [isTel, setIsTel] = useState(true)
    const [isAddress, setIsAddress] = useState(true)


    const check = isName && isEmail && isPassword && isPasswordConfirm && isTel && isAddress
        && inputName && inputEmail && inputPw && inputPwValidate && inputTel && inputAddress;

    // name 입력값
    const handleInputName = (e) => {
        const nameRegex = /^[가-힣]{2,5}$/
        setInputName(e.target.value)
        if (!nameRegex.test(e.target.value)) {
            setNameMessage('한글 2글자 이상 5글자 이하로 입력해주세요.')
            setIsName(false)
        } else {
            setNameMessage('올바른 이름 형식입니다 :)')
            setIsName(true)
        }
    };

    // email 입력값
    const handleInputEmail = (e) => {
        const emailRegex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
        setInputEmail(e.target.value);
        console.log(e.target.value);
        if (!emailRegex.test(e.target.value)) {
            setEmailMessage('이메일 형식이 틀렸어요! 다시 확인해주세요 ㅜ ㅜ')
            setIsEmail(false)
        } else {
            setEmailMessage('올바른 이메일 형식이에요 : )')
            setIsEmail(true)
        }
    };

    // pw 입력값
    const handleInputPw = (e) => {
        const passwordRegex =
            /^(?=.*[a-zA-Z])(?=.*[~!@#$%^&*"'+=`|:;-_-])(?=.*[0-9]).{8,25}$/
        setInputPw(e.target.value);
        console.log(e.target.value);
        if (!passwordRegex.test(e.target.value)) {
            setPasswordMessage('숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!')
            setIsPassword(false)
        } else {
            setPasswordMessage('안전한 비밀번호에요 : )')
            setIsPassword(true)
        }
    };

    // pw 입력값 (유효성검사용)
    const handleInputPwValidate = (e) => {
        setInputPwValidate(e.target.value);
        console.log(e.target.value);
        if (inputPw === e.target.value) {
            setPasswordConfirmMessage('비밀번호를 똑같이 입력했어요 : )')
            setIsPasswordConfirm(true)
        } else {
            setPasswordConfirmMessage('비밀번호가 틀려요. 다시 확인해주세요 ㅜ ㅜ')
            setIsPasswordConfirm(false)
        }
    };

    // tel 입력값
    const handleInputTel = (e) => {
        const telRegex =
            /^(?:(010-\d{4})|(01[1|6|7|8|9]-\d{3,4}))-(\d{4})$/;
        setInputTel(e.target.value);
        console.log(e.target.value);
        if (!telRegex.test(e.target.value) && e.target.value.length === 11) {
            setTelMessage('숫자를 정확히 입력했어요 : )')
            setIsTel(true)
        } else {
            setTelMessage('핸드폰번호를 정확히 입력해주세요')
            setIsTel(false)
        }
    };

    // address 입력값
    const handleInputAddress = (e) => {
        setInputAddress(e.target.value);
        console.log(e.target.value);
        if (e.target.value.length === 0) {
            setAddressMessage('주소를 입력해주세요')
            setIsAddress(false)
        } else {
            setAddressMessage('주소가 상세할수록 좋아요 : )')
            setIsAddress(true)
        }
    };

    const onSubmit = (e) => {
        e.preventDefault();

        const user = {
            username: inputName,
            password: inputPw,
            email: inputEmail,
            tel: inputTel,
            address: inputAddress,
        };

        //register API 호출
        axios
            .post('http://localhost:8000/accounts/register/', user)
            .then((res) => {
                if (res.data.token.access) {
                    console.log(res.data.token.access);
                    toast.success("가입을 축하드립니다! 입력한메일주소로 메일인증을 진행해주세요" + "😍", {
                        position: "top-center",
                        autoClose: 2000,
                    })
                    setTimeout(() => window.location.href = "/Signin", 2000);
                    // alert("가입을 축하드립니다!");
                    // window.location.href = "/Signin";
                } else {
                    setInputName("");
                    setInputEmail("");
                    setInputPw("");
                    setInputPwValidate("");
                    setInputTel("");
                    setInputAddress("");
                    localStorage.clear();
                }
            })
            .catch((err) => {
                console.log(user);
                console.log(err);
                toast.error("이미 존재하는 아이디 입니다." + "😭", {
                    position: "top-center",
                    autoClose: 2000,
                })
                // alert("이미 존재하는 아이디 입니다.");
            });
    };

    return (
        <Container component="main" maxWidth="xs">
            <ToastContainer />
            <Box
                sx={{
                    marginTop: 20,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    회원가입
                </Typography>
                <TextField
                    error={!isName}
                    value={inputName}
                    onChange={handleInputName}
                    margin="normal"
                    label="user_Name"
                    required
                    fullWidth
                    name="name"
                    helperText={nameMessage}
                    placeholder="홍길동"
                    autoFocus
                />
                <TextField
                    error={!isEmail}
                    value={inputEmail}
                    onChange={handleInputEmail}
                    margin="normal"
                    label="Email Address"
                    required
                    fullWidth
                    name="email"
                    autoComplete="email"
                    helperText={emailMessage}
                    placeholder="ABCD@naver.com"
                />
                <TextField
                    error={!isPassword}
                    value={inputPw}
                    onChange={handleInputPw}
                    margin="normal"
                    label="Password"
                    type="password"
                    required
                    fullWidth
                    name="password"
                    autoComplete="current-password"
                    helperText={passwordMessage}
                />
                <TextField
                    error={!isPasswordConfirm}
                    value={inputPwValidate}
                    onChange={handleInputPwValidate}
                    margin="normal"
                    label="Password체크"
                    type="password"
                    required
                    fullWidth
                    name="password"
                    autoComplete="current-password"
                    helperText={passwordConfirmMessage}
                />
                <TextField
                    error={!isTel}
                    value={inputTel}
                    onChange={handleInputTel}
                    margin="normal"
                    label="Tel"
                    required
                    fullWidth
                    name="tel"
                    helperText={telMessage}
                    placeholder="01012345678"
                />
                <TextField
                    error={!isAddress} // true면 빨간색으로 작동
                    value={inputAddress}
                    onChange={handleInputAddress}
                    margin="normal"
                    label="Address"
                    required
                    fullWidth
                    name="address"
                    helperText={addressMessage}
                    placeholder="서울특별시 중구 세종대로 110 서울특별시청"
                />

                <Button
                    onClick={onSubmit}
                    disabled={!check} // true면 버튼 사라짐
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    가입하기
                </Button>
            </Box>
        </Container>
    );
}
