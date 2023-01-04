/* eslint-disable */

import Box from '@mui/material/Box';
import sty from "./css/styles.css";
import { Mobile, Pc } from './responsive';

export default function About({children}) {
    return (
    <>
        <Pc><Box sx={{marginTop: 10,}}>
            <html lang="en">
                <head>
                    <meta charset="utf-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
                    <meta name="description" content="" />
                    <meta name="author" content="" />
                    <title>Dollido - about</title>
                    <link rel="icon" type="image/x-icon" href="assets/favicon.ico" />
                    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css" rel="stylesheet" />
                    <link href={sty} rel="stylesheet" />
                </head>
                <body className="d-flex flex-column">
                    <main className="flex-shrink-0">
                        {/* <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                            <div className="container px-5">
                                <a className="navbar-brand" href="index.html">Dollido</a>
                                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
                                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                                        <li className="nav-item dropdown">
                                            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownBlog">
                                            </ul>
                                        </li>
                                        <li className="nav-item dropdown">
                                            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownPortfolio">
                                                <li><a className="dropdown-item" href="portfolio-overview.html">Portfolio Overview</a></li>
                                                <li><a className="dropdown-item" href="portfolio-item.html">Portfolio Item</a></li>
                                            </ul>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </nav> */}
                        <header className="py-5">
                            <div className="container px-5">
                                <div className="row justify-content-center">
                                    <div className="col-lg-8 col-xxl-6">
                                        <div className="text-center my-5">
                                            <img className="img-fluid rounded mb-5 mb-lg-0" src="assets/logo.png" alt="..." />
                                            <p className="lead fw-normal text-muted mb-4">기존 유실물 찾기 서비스를 이용하며 불편했던 경험을 개선하고자 습득자는 간편하게 유실물을 등록하고, 분실자는 간단한 인증을 통해 유실물을 찾아가고자 본 서비스를 고안하게 되었습니다. </p>
                                            <a className="btn btn-primary btn-lg" href="#scroll-target">Read our story</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </header>
                        <section className="py-5 bg-light" id="scroll-target">
                            <div className="container px-5 my-5">
                                <div className="row gx-5 align-items-center">
                                    <div className="col-lg-6"><img className="img-fluid rounded mb-5 mb-lg-0" src="assets/lost112.png" alt="..." /></div>
                                    <div className="col-lg-6">  
                                        <h2 className="fw-bolder">기존 사례 분석 - lost112</h2>
                                        <p className="lead fw-normal text-muted mb-0">1. 습득물에 대한 특이사항 정보가 구체적으로 기입되어 있지 않다.</p>
                                        <p className="lead fw-normal text-muted mb-0">2. 특이사항이 기입되지 않은 경우, 게시글만 보고 본인의 분실물인지 확인할 수 없다.</p>
                                        <p className="lead fw-normal text-muted mb-0">3. 이미지가 등록되어 있지 않은 경우, 게시글만 보고 본인의 분실물인지 파악하기 어렵다.</p>
                                        <p className="lead fw-normal text-muted mb-0">4. 지역별, 날짜별로 보기가 어렵다.</p>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section className="py-5">
                            <div className="container px-5 my-5">
                                <div className="row gx-5 align-items-center">
                                    <div className="col-lg-6 order-first order-lg-last"><img className="img-fluid rounded mb-5 mb-lg-0" src="assets/dollido.png" alt="..." /></div>
                                    <div className="col-lg-6">
                                        <h2 className="fw-bolder">기대 효과</h2>
                                        <p className="lead fw-normal text-muted mb-0">1. 여러 군데 분포 되어있는 분실물 정보를 모아 한번에 확인 및 등록, 회수, 반납이 가능하다.</p>
                                        <p className="lead fw-normal text-muted mb-0">2. 습득물에 대한 구체적인 상세 페이지 제공 및 날짜별 정렬 기능 제공</p>
                                        <p className="lead fw-normal text-muted mb-0">3. 본 서비스를 통해 AI 모델로 습득물에 대한 카테고리와 색상을 분류함으로써, 정확한 정보를 제공하여 유실물을 쉽고 빠르게 찾을 수 있다.</p>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section className="py-5 bg-light">
                            <div className="container px-5 my-5">
                                <div className="text-center">
                                    <h2 className="fw-bolder">Our team</h2>
                                    <p className="lead fw-normal text-muted mb-5">충남-충북 14조 - Dollido</p>
                                </div>
                                <div className="row gx-5 row-cols-1 row-cols-sm-2 row-cols-xl-4 justify-content-center">
                                    <div className="col mb-5 mb-5 mb-xl-0">
                                        <div className="text-center">
                                            <img className="img-fluid rounded-circle mb-4 px-4" src="assets/임희건.jpg" width = "200px" height = "200px" alt="..." />
                                            <h5 className="fw-bolder">임희건</h5>
                                            <div className="fst-italic text-muted">FE &amp; 팀장</div>
                                        </div>
                                    </div>
                                    <div className="col mb-5 mb-5 mb-xl-0">
                                        <div className="text-center">
                                            <img className="img-fluid rounded-circle mb-4 px-4" src="assets/이정형.jpg" width = "200px" height = "200px" alt="..." />
                                            <h5 className="fw-bolder">이정형</h5>
                                            <div className="fst-italic text-muted">BE &amp; Modelling</div>
                                        </div>
                                    </div>
                                    <div className="col mb-5 mb-5 mb-sm-0">
                                        <div className="text-center">
                                            <img className="img-fluid rounded-circle mb-4 px-4" src="assets/송병섭.jpg" width = "200px" height = "200px" alt="..." />
                                            <h5 className="fw-bolder">송병섭</h5>
                                            <div className="fst-italic text-muted">BE &amp; FE</div>
                                        </div>
                                    </div>
                                    <div className="col mb-5">
                                        <div className="text-center">
                                            <img className="img-fluid rounded-circle mb-4 px-4" src="assets/황순규.jpg" width = "200px" height = "200px" alt="..." />
                                            <h5 className="fw-bolder">황순규</h5>
                                            <div className="fst-italic text-muted">BE &amp; Modelling</div>
                                        </div>
                                    </div>
                                    <div className="col mb-5 mb-5 mb-xl-0">
                                        <div className="text-center">
                                            <img className="img-fluid rounded-circle mb-4 px-4" src="assets/최세영.jpg" width = "200px" height = "200px" alt="..." />
                                            <h5 className="fw-bolder">최세영</h5>
                                            <div className="fst-italic text-muted">FE</div>
                                        </div>
                                    </div>
                                    <div className="col mb-5 mb-5 mb-xl-0">
                                        <div className="text-center">
                                            <img className="img-fluid rounded-circle mb-4 px-4" src="assets/윤소이.png" width = "200px" height = "200px" alt="..." />
                                            <h5 className="fw-bolder">윤소이</h5>
                                            <div className="fst-italic text-muted">Modelling</div>
                                        </div>
                                    </div>
                                    <div className="col mb-5 mb-5 mb-xl-0">
                                        <div className="text-center">
                                            <img className="img-fluid rounded-circle mb-4 px-4" src="assets/유현주.jpg" width = "200px" height = "200px" alt="..." />
                                            <h5 className="fw-bolder">유현주</h5>
                                            <div className="fst-italic text-muted">BE</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </main>
                    <footer className="bg-dark py-4 mt-auto">
                        <div className="container px-5">
                            <div className="row align-items-center justify-content-between flex-column flex-sm-row">
                                <div className="col-auto"><div className="small m-0 text-white">Copyright &copy; Your Website 2022</div></div>
                                <div className="col-auto">
                                    <a className="link-light small" href="#!">Privacy</a>
                                    <span className="text-white mx-1">&middot;</span>
                                    <a className="link-light small" href="#!">Terms</a>
                                    <span className="text-white mx-1">&middot;</span>
                                    <a className="link-light small" href="#!">Contact</a>
                                </div>
                            </div>
                        </div>
                    </footer>
                    {/* <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script> */}
                    {/* <script src="{% static 'js/scripts.js' %}"></script> */}
                </body>
            </html>
            </Box></Pc>

            <Mobile><Box sx={{marginTop: -5,}}>
            <html lang="en">
                <head>
                    <meta charset="utf-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
                    <meta name="description" content="" />
                    <meta name="author" content="" />
                    <title>Dollido - about</title>
                    <link rel="icon" type="image/x-icon" href="assets/favicon.ico" />
                    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css" rel="stylesheet" />
                    <link href={sty} rel="stylesheet" />
                </head>
                <body className="d-flex flex-column">
                    <main className="flex-shrink-0">
                        {/* <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                            <div className="container px-5">
                                <a className="navbar-brand" href="index.html">Dollido</a>
                                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
                                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                                        <li className="nav-item dropdown">
                                            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownBlog">
                                            </ul>
                                        </li>
                                        <li className="nav-item dropdown">
                                            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownPortfolio">
                                                <li><a className="dropdown-item" href="portfolio-overview.html">Portfolio Overview</a></li>
                                                <li><a className="dropdown-item" href="portfolio-item.html">Portfolio Item</a></li>
                                            </ul>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </nav> */}
                        <header className="py-5">
                            <div className="container px-5">
                                <div className="row justify-content-center">
                                    <div className="col-lg-8 col-xxl-6">
                                        <div className="text-center my-5">
                                            <img className="img-fluid rounded mb-5 mb-lg-0" src="assets/logo.png" alt="..." />
                                            <p className="lead fw-normal text-muted mb-4">기존 유실물 찾기 서비스를 이용하며 불편했던 경험을 개선하고자 습득자는 간편하게 유실물을 등록하고, 분실자는 간단한 인증을 통해 유실물을 찾아가고자 본 서비스를 고안하게 되었습니다. </p>
                                            <a className="btn btn-primary btn-lg" href="#scroll-target">Read our story</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </header>
                        <section className="py-5 bg-light" id="scroll-target">
                            <div className="container px-5 my-5">
                                <div className="row gx-5 align-items-center">
                                    <div className="col-lg-6"><img className="img-fluid rounded mb-5 mb-lg-0" src="assets/lost112.png" alt="..." /></div>
                                    <div className="col-lg-6">  
                                        <h2 className="fw-bolder">기존 사례 분석 - lost112</h2>
                                        <p className="lead fw-normal text-muted mb-0">1. 습득물에 대한 특이사항 정보가 구체적으로 기입되어 있지 않다.</p>
                                        <p className="lead fw-normal text-muted mb-0">2. 특이사항이 기입되지 않은 경우, 게시글만 보고 본인의 분실물인지 확인할 수 없다.</p>
                                        <p className="lead fw-normal text-muted mb-0">3. 이미지가 등록되어 있지 않은 경우, 게시글만 보고 본인의 분실물인지 파악하기 어렵다.</p>
                                        <p className="lead fw-normal text-muted mb-0">4. 지역별, 날짜별로 보기가 어렵다.</p>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section className="py-5">
                            <div className="container px-5 my-5">
                                <div className="row gx-5 align-items-center">
                                    <div className="col-lg-6 order-first order-lg-last"><img className="img-fluid rounded mb-5 mb-lg-0" src="assets/dollido.png" alt="..." /></div>
                                    <div className="col-lg-6">
                                        <h2 className="fw-bolder">기대 효과</h2>
                                        <p className="lead fw-normal text-muted mb-0">1. 여러 군데 분포 되어있는 분실물 정보를 모아 한번에 확인 및 등록, 회수, 반납이 가능하다.</p>
                                        <p className="lead fw-normal text-muted mb-0">2. 습득물에 대한 구체적인 상세 페이지 제공 및 날짜별 정렬 기능 제공</p>
                                        <p className="lead fw-normal text-muted mb-0">3. 본 서비스를 통해 AI 모델로 습득물에 대한 카테고리와 색상을 분류함으로써, 정확한 정보를 제공하여 유실물을 쉽고 빠르게 찾을 수 있다.</p>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section className="py-5 bg-light">
                            <div className="container px-5 my-5">
                                <div className="text-center">
                                    <h2 className="fw-bolder">Our team</h2>
                                    <p className="lead fw-normal text-muted mb-5">충남-충북 14조 - Dollido</p>
                                </div>
                                <div className="row gx-5 row-cols-1 row-cols-sm-2 row-cols-xl-4 justify-content-center">
                                    <div className="col mb-5 mb-5 mb-xl-0">
                                        <div className="text-center">
                                            <img className="img-fluid rounded-circle mb-4 px-4" src="assets/임희건.jpg" width = "200px" height = "200px" alt="..." />
                                            <h5 className="fw-bolder">임희건</h5>
                                            <div className="fst-italic text-muted">FE &amp; 팀장</div>
                                        </div>
                                    </div>
                                    <div className="col mb-5 mb-5 mb-xl-0">
                                        <div className="text-center">
                                            <img className="img-fluid rounded-circle mb-4 px-4" src="assets/이정형.jpg" width = "200px" height = "200px" alt="..." />
                                            <h5 className="fw-bolder">이정형</h5>
                                            <div className="fst-italic text-muted">BE &amp; Modelling</div>
                                        </div>
                                    </div>
                                    <div className="col mb-5 mb-5 mb-sm-0">
                                        <div className="text-center">
                                            <img className="img-fluid rounded-circle mb-4 px-4" src="assets/송병섭.jpg" width = "200px" height = "200px" alt="..." />
                                            <h5 className="fw-bolder">송병섭</h5>
                                            <div className="fst-italic text-muted">BE &amp; FE</div>
                                        </div>
                                    </div>
                                    <div className="col mb-5">
                                        <div className="text-center">
                                            <img className="img-fluid rounded-circle mb-4 px-4" src="assets/황순규.jpg" width = "200px" height = "200px" alt="..." />
                                            <h5 className="fw-bolder">황순규</h5>
                                            <div className="fst-italic text-muted">BE &amp; Modelling</div>
                                        </div>
                                    </div>
                                    <div className="col mb-5 mb-5 mb-xl-0">
                                        <div className="text-center">
                                            <img className="img-fluid rounded-circle mb-4 px-4" src="assets/최세영.jpg" width = "200px" height = "200px" alt="..." />
                                            <h5 className="fw-bolder">최세영</h5>
                                            <div className="fst-italic text-muted">FE</div>
                                        </div>
                                    </div>
                                    <div className="col mb-5 mb-5 mb-xl-0">
                                        <div className="text-center">
                                            <img className="img-fluid rounded-circle mb-4 px-4" src="assets/윤소이.png" width = "200px" height = "200px" alt="..." />
                                            <h5 className="fw-bolder">윤소이</h5>
                                            <div className="fst-italic text-muted">Modelling</div>
                                        </div>
                                    </div>
                                    <div className="col mb-5 mb-5 mb-xl-0">
                                        <div className="text-center">
                                            <img className="img-fluid rounded-circle mb-4 px-4" src="assets/유현주.jpg" width = "200px" height = "200px" alt="..." />
                                            <h5 className="fw-bolder">유현주</h5>
                                            <div className="fst-italic text-muted">BE</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </main>
                    <footer className="bg-dark py-4 mt-auto">
                        <div className="container px-5">
                            <div className="row align-items-center justify-content-between flex-column flex-sm-row">
                                <div className="col-auto"><div className="small m-0 text-white">Copyright &copy; Your Website 2022</div></div>
                                <div className="col-auto">
                                    <a className="link-light small" href="#!">Privacy</a>
                                    <span className="text-white mx-1">&middot;</span>
                                    <a className="link-light small" href="#!">Terms</a>
                                    <span className="text-white mx-1">&middot;</span>
                                    <a className="link-light small" href="#!">Contact</a>
                                </div>
                            </div>
                        </div>
                    </footer>
                    {/* <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script> */}
                    {/* <script src="{% static 'js/scripts.js' %}"></script> */}
                </body>
            </html>
            </Box></Mobile>
        </>
    );
}
