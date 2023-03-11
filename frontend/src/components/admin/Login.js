import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/admin/Login";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { purple } from "@mui/material/colors";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import Navbar from "./components/admin/Navbar";
function SignInBasic() {
    const [rememberMe, setRememberMe] = useState(false);

    const handleSetRememberMe = () => setRememberMe(!rememberMe);

    return (
        <>
            <DefaultNavbar
                routes={routes}
                action={{
                    type: "external",
                    route: "https://www.creative-tim.com/product/material-kit-react",
                    label: "free download",
                    color: "info",
                }}
                transparent
                light
            />
            <MKBox
                position="absolute"
                top={0}
                left={0}
                zIndex={1}
                width="100%"
                minHeight="100vh"
                sx={{
                    backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
                        `${linearGradient(
                            rgba(gradients.dark.main, 0.6),
                            rgba(gradients.dark.state, 0.6)
                        )}, url(${bgImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                }}
            />
            <MKBox px={1} width="100%" height="100vh" mx="auto" position="relative" zIndex={2}>
                <Grid container spacing={1} justifyContent="center" alignItems="center" height="100%">
                    <Grid item xs={11} sm={9} md={5} lg={4} xl={3}>
                        <Card>
                            <MKBox
                                variant="gradient"
                                bgColor="info"
                                borderRadius="lg"
                                coloredShadow="info"
                                mx={2}
                                mt={-3}
                                p={2}
                                mb={1}
                                textAlign="center"
                            >
                                <MKTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                                    Iniciar sesión
                                </MKTypography>
                                <Grid container spacing={3} justifyContent="center" sx={{ mt: 1, mb: 2 }}>
                                    <Grid item xs={2}>
                                        <MKTypography component={MuiLink} href="#" variant="body1" color="white">
                                            <FacebookIcon color="inherit" />
                                        </MKTypography>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <MKTypography component={MuiLink} href="#" variant="body1" color="white">
                                            <GitHubIcon color="inherit" />
                                        </MKTypography>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <MKTypography component={MuiLink} href="#" variant="body1" color="white">
                                            <GoogleIcon color="inherit" />
                                        </MKTypography>
                                    </Grid>
                                </Grid>
                            </MKBox>
                            <MKBox pt={4} pb={3} px={3}>
                                <MKBox component="form" role="form">
                                    <MKBox mb={2}>
                                        <MKInput type="email" label="Email" fullWidth />
                                    </MKBox>
                                    <MKBox mb={2}>
                                        <MKInput type="password" label="Password" fullWidth />
                                    </MKBox>
                                    <MKBox display="flex" alignItems="center" ml={-1}>
                                        <Switch checked={rememberMe} onChange={handleSetRememberMe} />
                                        <MKTypography
                                            variant="button"
                                            fontWeight="regular"
                                            color="text"
                                            onClick={handleSetRememberMe}
                                            sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
                                        >
                                            &nbsp;&nbsp;Remember me
                                        </MKTypography>
                                    </MKBox>
                                    <MKBox mt={4} mb={1}>
                                        <MKButton onClick={handleSubmit} variant="gradient" color="info" fullWidth>
                                            sign in
                                        </MKButton>
                                    </MKBox>
                                    <MKBox mt={3} mb={1} textAlign="center">
                                        <MKTypography variant="button" color="text">
                                            Don&apos;t have an account?{" "}
                                            <MKTypography
                                                component={Link}
                                                to="/authentication/sign-up/cover"
                                                variant="button"
                                                color="info"
                                                fontWeight="medium"
                                                textGradient
                                            >
                                                Sign up
                                            </MKTypography>
                                        </MKTypography>
                                    </MKBox>
                                </MKBox>
                            </MKBox>
                        </Card>
                    </Grid>
                </Grid>
            </MKBox>
            <MKBox width="100%" position="absolute" zIndex={2} bottom="1.625rem">
                <SimpleFooter light />
            </MKBox>
        </>
    );
}

export default SignInBasic;
