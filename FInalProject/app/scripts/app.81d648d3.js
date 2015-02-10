"use strict";angular.module("quizSurveyApp",["ngAnimate","ngCookies","ngResource","ngSanitize","ngTouch","picardy.fontawesome","ui.bootstrap","ui.router","ui.utils","angular-loading-bar","angular-momentjs","FBAngular","lazyModel","toastr","angularBootstrapNavTree","oc.lazyLoad","ui.select","textAngular"]).run(["$rootScope","$state","$stateParams","userAuthFactory","$window","$location",function(a,b,c,d,e,f){d.isLoggedIn();a.logof=function(){d.logout(),f.path("/app/user/login")},a.userName=e.sessionStorage.removeItem("token"),a.$state=b,a.$stateParams=c,a.$on("$stateChangeSuccess",function(b,c){b.targetScope.$watch("$viewContentLoaded",function(){angular.element("html, body, #content").animate({scrollTop:0},200),setTimeout(function(){angular.element("#wrap").css("visibility","visible"),angular.element(".dropdown").hasClass("open")||angular.element(".dropdown").find(">ul").slideUp()},200)}),a.containerClass=c.containerClass})}]).config(["uiSelectConfig","$httpProvider",function(a,b){a.theme="bootstrap",b.interceptors.push("authInterceptorService")}]).config(["$stateProvider","$urlRouterProvider",function(a,b){b.otherwise("/app/welcome"),a.state("app",{"abstract":!0,url:"/app",templateUrl:"views/tmpl/app.html"}).state("app.welcome",{url:"/welcome",controller:"welcomeCtrl",templateUrl:"views/tmpl/welcome.html",resolve:{plugins:["$ocLazyLoad",function(a){return a.load(["scripts/vendor/datatables/datatables.bootstrap.min.css"])}]}}).state("app.user",{url:"/user",template:"<div ui-view></div>"}).state("app.user.welcome",{url:"/welcome",controller:"currentUserMainCtrl",templateUrl:"views/tmpl/currentUser/currentUserMain.html"}).state("app.user.login",{url:"/login",controller:"userAuthCTRL",templateUrl:"views/tmpl/auth/login.html"}).state("app.user.signup",{url:"/signup",controller:"userAuthCTRL",templateUrl:"views/tmpl/auth/register.html"}).state("app.user.createquiz",{url:"/createquiz",controller:"createQuizSurveyCtrl",templateUrl:"views/tmpl/currentUser/createQuizSurvey.html"}).state("app.user.quiz",{url:"/quiz/:quizId",controller:"detailsQuizSurveyCtrl",templateUrl:"views/tmpl/currentUser/detailQuizSurvey.html"}).state("app.user.takequiz",{url:"/takequiz/:referenceId",controller:"takeQuizSurveyCtrl",templateUrl:"views/tmpl/currentUser/takeQuizSurvey.html"})}]),angular.module("quizSurveyApp").controller("MainCtrl",["$scope","$http",function(a,b){a.main={title:"Minovate",settings:{navbarHeaderColor:"scheme-default",sidebarColor:"scheme-default",brandingColor:"scheme-default",activeColor:"default-scheme-color",headerFixed:!0,asideFixed:!0,rightbarShow:!1}},a.ajaxFaker=function(){a.data=[];var c="http://www.filltext.com/?rows=10&fname={firstName}&lname={lastName}&delay=5&callback=JSON_CALLBACK";b.jsonp(c).success(function(b){a.data=b,console.log("cecky"),angular.element(".tile.refreshing").removeClass("refreshing")})}}]),angular.module("quizSurveyApp").directive("navCollapse",function(){return{restrict:"A",link:function(a,b){var c=b.find("ul").parent("li"),d=c.children("a"),e=b.children("li").not(c),f=e.children("a"),g=angular.element("#minovate"),h=angular.element("#sidebar"),i=angular.element("#controls");c.addClass("dropdown");var j=c.find("ul >.dropdown");j.addClass("submenu"),d.append('<i class="fa fa-plus"></i>'),d.on("click",function(a){if(g.hasClass("sidebar-sm")||g.hasClass("sidebar-xs")||g.hasClass("hz-menu"))return!1;var b=angular.element(this),d=b.parent("li"),e=angular.element(".submenu.open");d.hasClass("submenu")||c.not(d).removeClass("open").find("ul").slideUp(),e.not(b.parents(".submenu")).removeClass("open").find("ul").slideUp(),d.toggleClass("open").find(">ul").stop().slideToggle(),a.preventDefault()}),c.on("mouseenter",function(){h.addClass("dropdown-open"),i.addClass("dropdown-open")}),c.on("mouseleave",function(){h.removeClass("dropdown-open"),i.removeClass("dropdown-open")}),f.on("click",function(){c.removeClass("open").find("ul").slideUp()});var k=angular.element(".dropdown>ul>.active").parent();k.css("display","block")}}}),angular.module("quizSurveyApp").directive("slimscroll",function(){return{restrict:"A",link:function(a,b,c){var d={},e=function(){c.slimscroll?d=a.$eval(c.slimscroll):c.slimscrollOption&&(d=a.$eval(c.slimscrollOption)),b.slimscroll({destroy:!0}),b.slimscroll(d)};e();var f=angular.element(".sidebar-collapse"),g=angular.element(window),h=angular.element("#sidebar"),i=function(){e(),angular.element("#sidebar .slimScrollBar").is(":visible")?h.removeClass("scroll-inactive"):h.addClass("scroll-inactive")};f.on("click",function(){i()}),g.resize(function(){i()}),c.slimscroll&&!d.noWatch&&a.$watchCollection(c.slimscroll,e),c.slimscrollWatch&&a.$watchCollection(c.slimscrollWatch,e),c.slimssrollListenTo&&a.on(c.slimscrollListenTo,e)}}}),angular.module("quizSurveyApp").directive("sparkline",[function(){return{restrict:"A",scope:{data:"=",options:"="},link:function(a,b){var c,d=a.data,e=a.options,f=function(){return b.sparkline(d,e)};return angular.element(window).resize(function(){clearTimeout(c),c=setTimeout(f,200)}),f()}}}]),angular.module("quizSurveyApp").controller("welcomeCtrl",["$scope","$http","quizSurveyFactory",function(a,b,c){a.page={title:"Welcome to Quiz Maker",subtitle:"Create Quizzes & Surveys..."},a.quizes=[],a.surveys=[],c.getAllPublic().then(function(b){a.quizes=b.filter(function(a){return 0==a.Type?!0:void 0}),a.surveys=b.filter(function(a){return 1==a.Type?!0:void 0})}),a.sendLink=function(a){console.log(a);var b={QuizSurveyId:a.QuizSurveyId,QuizSurveyTitle:a.QuizSurveyTitle,EmailToShare:a.emailField,Link:"http://quizsurvey.azurewebsites.net/#/app/user/takequiz/"+a.QuizSurveyId};c.shareQuiz(b).then(function(){a.selectedToShare=!1,a.emailSent=!0})}}]),angular.module("quizSurveyApp").directive("collapseSidebar",["$rootScope",function(){return{restrict:"A",link:function(a,b){var c=angular.element("#minovate"),d=angular.element(window),e=d.width(),f=function(){angular.element("#sidebar").find(".ink").remove()},g=function(){e=d.width(),992>e?c.addClass("sidebar-sm"):c.removeClass("sidebar-sm sidebar-xs"),768>e?c.removeClass("sidebar-sm").addClass("sidebar-xs"):e>992?c.removeClass("sidebar-sm sidebar-xs"):c.removeClass("sidebar-xs").addClass("sidebar-sm"),c.hasClass("sidebar-sm-forced")&&c.addClass("sidebar-sm"),c.hasClass("sidebar-xs-forced")&&c.addClass("sidebar-xs")};g(),d.resize(function(){if(e!==d.width()){var a;clearTimeout(a),a=setTimeout(g,300),f()}}),b.on("click",function(a){c.hasClass("sidebar-sm")?c.removeClass("sidebar-sm").addClass("sidebar-xs"):c.hasClass("sidebar-xs")?c.removeClass("sidebar-xs"):c.addClass("sidebar-sm"),c.removeClass("sidebar-sm-forced sidebar-xs-forced"),c.parent().removeClass("sidebar-sm sidebar-xs"),f(),a.preventDefault()})}}}]),angular.module("quizSurveyApp").directive("ripple",function(){return{restrict:"A",link:function(a,b){var c,d,e,f,g;angular.element(b).find(">li>a").click(function(a){c=angular.element(this).parent(),0===c.find(".ink").length&&c.prepend('<span class="ink"></span>'),d=c.find(".ink"),d.removeClass("animate"),d.height()||d.width()||(e=Math.max(c.outerWidth(),c.outerHeight()),d.css({height:e,width:e})),f=a.pageX-c.offset().left-d.width()/2,g=a.pageY-c.offset().top-d.height()/2,d.css({top:g+"px",left:f+"px"}).addClass("animate"),setTimeout(function(){angular.element(".ink").remove()},600)})}}}),angular.module("quizSurveyApp").controller("NavCtrl",["$scope",function(a){a.oneAtATime=!1,a.status={isFirstOpen:!0,isSecondOpen:!0,isThirdOpen:!0}}]),angular.module("quizSurveyApp").directive("pageLoader",["$timeout",function(a){return{restrict:"AE",template:'<div class="dot1"></div><div class="dot2"></div>',link:function(b,c){c.addClass("hide"),b.$on("$stateChangeStart",function(){c.toggleClass("hide animate")}),b.$on("$stateChangeSuccess",function(b){b.targetScope.$watch("$viewContentLoaded",function(){a(function(){c.toggleClass("hide animate")},600)})})}}}]),angular.module("quizSurveyApp").controller("currentUserMainCtrl",["$scope","quizSurveyFactory","userAuthFactory","$location",function(a,b,c,d){var e=c.isLoggedIn();e||d.path("/app/user/login"),a.refreshData=function(){b.getAll().then(function(b){a.quizes=b.filter(function(a){return 0==a.Type?!0:void 0}),a.surveys=b.filter(function(a){return 1==a.Type?!0:void 0})})},a.main={title:"CC Quizmaker",subTitle:"Welcome"},a.loggedInMain=!0,a.quizes=[],a.surveys=[],b.getAll().then(function(b){a.quizes=b.filter(function(a){return 0==a.Type?!0:void 0}),a.surveys=b.filter(function(a){return 1==a.Type?!0:void 0})}),a.deleteQuiz=function(c,d){b.deleteQuiz(d).then(function(){a.quizes.splice(c,1)},function(a){alert("Something went wrong! => "+a)})},a.sendLink=function(a){console.log(a);var c={QuizSurveyId:a.QuizSurveyId,QuizSurveyTitle:a.QuizSurveyTitle,EmailToShare:a.emailField,Link:"http://quizsurvey.azurewebsites.net/#/app/user/takequiz/"+a.QuizSurveyId};b.shareQuiz(c).then(function(){a.selectedToShare=!1,a.emailSent=!0})}}]),angular.module("quizSurveyApp").controller("createQuizSurveyCtrl",["$scope","quizSurveyFactory","$location","userAuthFactory",function(a,b,c,d){var e=d.isLoggedIn();e||c.path("/app/user/login"),a.loggedInMain=!0,a.questions=[],a.question={},a.isQuestionAddding=!1,a.tempAnswers=[],a.tempAnswer={},a.answerCount=0,a.listAnswer={},a.main={title:"CC Quizmaker",subTitle:"Create Quiz"},a.saveQuestion=function(){a.question.answers=a.tempAnswers,a.questions.push(a.question),console.log(a.question),a.question={},a.tempAnswers=[],a.tempAnswer={},a.answerCount=0,a.isQuestionAddding=!1},a.addAnswer=function(){a.tempAnswer={answer:"",isCorrect:!1},a.tempAnswers.push(a.tempAnswer),a.answerCount+=1,console.log(a.answerCount)},a.openAddQuestionPanel=function(){a.isQuestionAddding=!0},a.questionAdd=function(){a.questions.push(a.question)},a.listAnswer=function(b){var c=a.questions[b].answers;a.listAnswer=c,console.log(c)},a.saveQuiz=function(d){var e={QuestionSurveyTitle:d.name,Type:d.type,Description:d.description};b.createQuiz(e).then(function(d){a.questions.forEach(function(a){b.addQuestion(d.QuizSurveyId,a).then(function(c){a.answers.forEach(function(a){b.addAnswers(c.QuestionId,a)})})}),c.path("/app/user/welcome")})}}]),angular.module("quizSurveyApp").controller("takeQuizSurveyCtrl",["$scope","$modal",function(){}]),angular.module("quizSurveyApp").controller("detailsQuizSurveyCtrl",["$scope","$stateParams","$location","quizSurveyFactory","userAuthFactory",function(a,b,c,d,e){var f=e.isLoggedIn();f||c.path("/app/user/login");var g=b.quizId;g||c.path("/app/user/welcome"),a.main={title:"CC Quizmaker",subTitle:"Quiz Details"},a.loggedInMain=!0,a.currentQuiz={},a.attendees=[],d.getQuiz(g).then(function(b){a.currentQuiz=b,console.log(a.currentQuiz)}),d.getQuizAttendees(g).then(function(b){a.attendees=b}),a.startEdit=function(b){var c={QuizSurveyId:b,QuestionSurveyTitle:a.currentQuiz.QuizSurveyTitle,Description:a.currentQuiz.Description,Type:a.currentQuiz.Type};d.putQuiz(b,c).then(function(){a.isEditing=!1})}}]),angular.module("quizSurveyApp").controller("userAuthCTRL",["$scope","userAuthFactory","$location",function(a,b,c){b.logout(),a.loginError=!1,a.loginErrorMessage="",a.passMatch=!1,a.login=function(){b.login(a.user).then(function(){c.path("/app/user/welcome")},function(b){b&&(a.loginError=!0,a.loginErrorMessage=b.error_description)})},a.signup=function(){if(a.newUser.passwordConfirm!==a.newUser.password)return void(a.passMatch=!0);var d={Email:a.newUser.email,FirstName:a.newUser.firstName,LastName:a.newUser.lastName,Password:a.newUser.password,ConfirmPassword:a.newUser.passwordConfirm};b.signup(d).then(function(){c.path("/app/user/login")})}}]),angular.module("quizSurveyApp").controller("takeQuizSurveyCtrl",["$scope","$stateParams","quizSurveyFactory","$location",function(a,b,c,d){var e=b.referenceId;e||d.path("/app/user/welcome"),a.loggedInMain=!0,a.currentQuiz={},a.qurrentQuestion={},a.qurrentAnswers=[],a.questionIndex=0,a.givenAswers=[],a.currentAnswer={},a.saveReady=!1;a.quizTaker={},a.showResult=!1,a.correctAnswerCount=0,a.wrongAnswerCount=0;var f=function(){c.getQuiz(e).then(function(b){a.currentQuiz=b,console.log(a.currentQuiz)})};f(),a.quizStarted=!1,a.selectAnswer=function(b){console.log(b),a.givenAswers.indexOf(b)&&(a.givenAswers.push(b),b.IsCorrect?a.correctAnswerCount+=1:a.wrongAnswerCount+=1)};var g=function(){c.getAnswers(a.qurrentQuestion.QuestionId).then(function(b){a.qurrentAnswers=b,console.log(a.currentQuiz)})};a.startQuiz=function(){a.quizStarted=!0,h(),g()},a.nextQuestion=function(){return a.questionIndex+1==a.currentQuiz.Questions.length?void(a.saveReady=!0):(a.questionIndex+=1,h(),void g())},a.saveFinish=function(){var b={Email:a.quizTaker.email,FullName:a.quizTaker.name,QuizSurveyId:a.currentQuiz.QuizSurveyId};c.createQuizTaker(b).then(function(b){localStorage.setItem("USSERID",b.QuizTakerId),a.givenAswers.forEach(function(b){var d={QuizId:a.currentQuiz.QuizSurveyId,AnswerId:b.AnswerId,QuizTakerId:null};d.QuizTakerId=localStorage.getItem("USSERID"),c.createQuestionAnswer(d).then(function(a){console.log(a)})})}),a.quizStarted=!1,a.showResult=!0};var h=function(){a.qurrentQuestion=a.currentQuiz.Questions[a.questionIndex]}}]),angular.module("quizSurveyApp").controller("FullwidthlayoutCtrl",["$scope",function(a){a.page={title:"Full-width Layout",subtitle:"Place subtitle here..."}}]),angular.module("quizSurveyApp").directive("tileControlClose",function(){return{restrict:"A",link:function(a,b){var c=b.parents(".tile");b.on("click",function(){c.addClass("closed").fadeOut()})}}}),angular.module("quizSurveyApp").directive("tileControlToggle",function(){return{restrict:"A",link:function(a,b){var c=b.parents(".tile");b.on("click",function(){c.toggleClass("collapsed"),c.children().not(".tile-header").slideToggle(150)})}}}),angular.module("quizSurveyApp").directive("tileControlRefresh",function(){return{restrict:"A",link:function(a,b){var c=b.parents(".tile"),d=b.parents(".dropdown");b.on("click",function(){c.addClass("refreshing"),d.trigger("click")})}}}),angular.module("quizSurveyApp").directive("tileControlFullscreen",function(){return{restrict:"A",link:function(a,b){var c=b.parents(".dropdown");b.on("click",function(){c.trigger("click")})}}}),angular.module("quizSurveyApp").directive("prettyprint",function(){return{restrict:"C",link:function(a,b){b.html(prettyPrintOne(b.html(),"",!0))}}}),angular.module("lazyModel",[]).directive("lazyModel",["$compile","$timeout",function(a,b){return{restrict:"A",priority:500,terminal:!0,require:["lazyModel","^form","?^lazySubmit"],scope:!0,controller:["$scope","$element","$attrs","$parse",function(a,b,c,d){if(""===c.lazyModel)throw"`lazy-model` should have a value.";var e=d(c.lazyModel),f=e.assign;this.accept=function(){f(a.$parent,a.buffer)},this.reset=function(){a.buffer=e(a.$parent)},a.$watch(c.lazyModel,angular.bind(this,function(){this.reset()}))}],compile:function(c){c.attr("ng-model","buffer"),c.removeAttr("lazy-model");var d=a(c);return{pre:function(a){d(a)},post:function(a,c,d,e){var f=e[0],g=e[1],h=e[2],i=h||g;if(void 0===i.$lazyControls){i.$lazyControls=[];for(var j=c.parent();"FORM"!==j[0].tagName;)j=j.parent();j.bind("submit",function(){b(function(){if(g.$valid){for(var a=0;a<i.$lazyControls.length;a++)i.$lazyControls[a].accept();h&&h.finalSubmit()}})}),j.bind("reset",function(a){a.preventDefault(),b(function(){for(var a=0;a<i.$lazyControls.length;a++)i.$lazyControls[a].reset()})})}i.$lazyControls.push(f),a.$on("$destroy",function(){for(var a=i.$lazyControls.length;a--;)i.$lazyControls[a]===f&&i.$lazyControls.splice(a,1)})}}}}}]).directive("lazySubmit",function(){return{restrict:"A",require:["lazySubmit","form"],controller:["$element","$attrs","$scope","$parse",function(a,b,c,d){var e=b.lazySubmit?d(b.lazySubmit):angular.noop;this.finalSubmit=function(){e(c)}}]}}),angular.module("quizSurveyApp").directive("activateButton",function(){return{restrict:"A",link:function(a,b,c){var d="btn-activated",e=c.activateButton,f=function(){b.addClass(d),setTimeout(function(){b.removeClass(d)},1e3)};b.on("click",function(){b.hasClass(d)||"success"!==e?b.hasClass(d)||"error"!==e?b.hasClass(d)||f():(b.addClass("btn-activated-error"),setTimeout(function(){b.removeClass("btn-activated-error")},1e3)):(b.addClass("btn-activated-success"),setTimeout(function(){b.removeClass("btn-activated-success")},1e3))})}}}),angular.module("quizSurveyApp").run(["$templateCache",function(a){a.put("templates/toastr/toastr.html",'<div class="{{toastClass}} {{toastType}}" ng-click="tapToast()">\n  <i class="fa {{iconType}}"></i>\n  <div ng-switch on="allowHtml">\n    <div ng-switch-default ng-if="title" class="{{titleClass}}">{{title}}</div>\n    <div ng-switch-default class="{{messageClass}}">{{message}}</div>\n    <div ng-switch-when="true" ng-if="title" class="{{titleClass}}" ng-bind-html="title"></div>\n    <div ng-switch-when="true" class="{{messageClass}}" ng-bind-html="message"></div>\n  </div>\n</div>')}]).constant("toastrConfig",{allowHtml:!1,closeButton:!1,closeHtml:"<button>&times;</button>",containerId:"toast-container",extendedTimeOut:1e3,iconClasses:{error:"toast-error",info:"toast-info",success:"toast-success",warning:"toast-warning"},messageClass:"toast-message",positionClass:"toast-top-right",tapToDismiss:!0,timeOut:5e3,titleClass:"toast-title",toastClass:"toast"}).factory("toastr",["$animate","$compile","$document","$rootScope","$sce","toastrConfig","$q",function(a,b,c,d,e,f,g){function h(a){if(a)p(a.toastId);else for(var b=0;b<s.length;b++)p(s[b].toastId)}function i(a,b,c){return o({iconClass:m().iconClasses.error,message:a,optionsOverride:c,title:b})}function j(a,b,c){return o({iconClass:m().iconClasses.info,message:a,optionsOverride:c,title:b})}function k(a,b,c){return o({iconClass:m().iconClasses.success,message:a,optionsOverride:c,title:b})}function l(a,b,c){return o({iconClass:m().iconClasses.warning,message:a,optionsOverride:c,title:b})}function m(){return angular.extend({},f)}function n(b){if(q)return t.promise;q=angular.element("<div></div>"),q.attr("id",b.containerId),q.addClass(b.positionClass),q.css({"pointer-events":"auto"});var d=c.find("body").eq(0);return a.enter(q,d,null,function(){t.resolve()}),t.promise}function o(c){function f(a,b,c){c.allowHtml?(a.scope.allowHtml=!0,a.scope.title=e.trustAsHtml(b.title),a.scope.message=e.trustAsHtml(b.message)):(a.scope.title=b.title,a.scope.message=b.message),a.scope.toastType=a.iconClass,a.scope.toastId=a.toastId,a.scope.options={extendedTimeOut:c.extendedTimeOut,messageClass:c.messageClass,tapToDismiss:c.tapToDismiss,timeOut:c.timeOut,titleClass:c.titleClass,toastClass:c.toastClass,iconType:c.iconType},c.closeButton&&(a.scope.options.closeHtml=c.closeHtml)}function g(a){var c=angular.element("<div toast></div>");return b(c)(a)}var h=m(),i={toastId:r++,scope:d.$new()};return i.iconClass=c.iconClass,c.optionsOverride&&(h=angular.extend(h,c.optionsOverride),i.iconClass=c.optionsOverride.iconClass||i.iconClass),f(i,c,h),i.el=g(i.scope),s.push(i),n(h).then(function(){a.enter(i.el,q,null,function(){i.scope.init()})}),i}function p(b){function c(a){for(var b=0;b<s.length;b++)if(s[b].toastId===a)return s[b]}var d=c(b);d&&a.leave(d.el,function(){d.scope.$destroy(),q&&0===q.children().length&&(s=[],q.remove(),q=null,t=g.defer())})}var q,r=0,s=[],t=g.defer(),u={clear:h,error:i,info:j,remove:p,success:k,warning:l};return u}]).directive("toast",function(){return{link:function(a){a.iconType=a.options.iconType}}}),angular.module("quizSurveyApp").directive("setNgAnimate",["$animate",function(a){return{link:function(b,c,d){b.$watch(function(){return b.$eval(d.setNgAnimate,b)},function(b){console.log("Directive animation Enabled: "+b),a.enabled(!!b,c)})}}}]),angular.module("quizSurveyApp").directive("onBlurValidation",function(){return{restrict:"A",require:"?ngModel",link:function(a,b,c,d){d&&(b.on("focus",function(){b.addClass("has-focus"),a.$apply(function(){d.hasFocus=!0})}),b.on("blur",function(){b.removeClass("has-focus"),b.addClass("has-visited"),a.$apply(function(){d.hasFocus=!1,d.hasVisited=!0})}),b.closest("form").on("submit",function(){b.addClass("has-visited"),a.$apply(function(){d.hasFocus=!1,d.hasVisited=!0})}))}}}),angular.module("quizSurveyApp").directive("submit",function(){return{restrict:"A",link:function(a,b,c){var d;return d=a[c.name],b.bind("submit",function(){return angular.forEach(d,function(a,b){return"string"==typeof b&&!b.match("^[$]")&&a.$pristine?a.$setViewValue(a.$value):void 0}),d.$valid?a.$apply(c.submit):void 0})}}}),angular.module("quizSurveyApp").directive("checkToggler",function(){return{restrict:"E",link:function(a,b){b.on("click",function(){b.hasClass("checked")?b.removeClass("checked"):b.addClass("checked")})}}}),angular.module("quizSurveyApp").directive("morrisLineChart",function(){return{restrict:"A",scope:{lineData:"=",lineXkey:"@",lineYkeys:"@",lineLabels:"@",lineColors:"@"},link:function(a,b){var c,d;c=void 0===a.lineColors||""===a.lineColors?null:JSON.parse(a.lineColors),a.$watch("lineData",function(){a.lineData&&(d?d.setData(a.lineData):d=new Morris.Line({element:b,data:a.lineData,xkey:a.lineXkey,ykeys:JSON.parse(a.lineYkeys),labels:JSON.parse(a.lineLabels),lineColors:c||["#0b62a4","#7a92a3","#4da74d","#afd8f8","#edc240","#cb4b4b","#9440ed"],resize:!0}))})}}}).directive("morrisAreaChart",function(){return{restrict:"A",scope:{lineData:"=",lineXkey:"@",lineYkeys:"@",lineLabels:"@",lineColors:"@",lineWidth:"@",fillOpacity:"@",showGrid:"@"},link:function(a,b){var c,d;c=void 0===a.lineColors||""===a.lineColors?null:JSON.parse(a.lineColors),a.$watch("lineData",function(){a.lineData&&(d?d.setData(a.lineData):d=new Morris.Area({element:b,data:a.lineData,xkey:a.lineXkey,ykeys:JSON.parse(a.lineYkeys),labels:JSON.parse(a.lineLabels),lineColors:c||["#0b62a4","#7a92a3","#4da74d","#afd8f8","#edc240","#cb4b4b","#9440ed"],lineWidth:a.lineWidth||"0",fillOpacity:a.fillOpacity||"0.8",grid:a.showGrid||!1,resize:!0}))})}}}).directive("morrisBarChart",function(){return{restrict:"A",scope:{barData:"=",barXkey:"@",barYkeys:"@",barLabels:"@",barColors:"@"},link:function(a,b){var c,d;c=void 0===a.barColors||""===a.barColors?null:JSON.parse(a.barColors),a.$watch("barData",function(){a.barData&&(d?d.setData(a.barData):d=new Morris.Bar({element:b,data:a.barData,xkey:a.barXkey,ykeys:JSON.parse(a.barYkeys),labels:JSON.parse(a.barLabels),barColors:c||["#0b62a4","#7a92a3","#4da74d","#afd8f8","#edc240","#cb4b4b","#9440ed"],xLabelMargin:2,resize:!0}))})}}}).directive("morrisDonutChart",function(){return{restrict:"A",scope:{donutData:"=",donutColors:"@"},link:function(a,b){var c,d;c=void 0===a.donutColors||""===a.donutColors?null:JSON.parse(a.donutColors),a.$watch("donutData",function(){a.donutData&&(d?d.setData(a.donutData):d=new Morris.Donut({element:b,data:a.donutData,colors:c||["#0B62A4","#3980B5","#679DC6","#95BBD7","#B0CCE1","#095791","#095085","#083E67","#052C48","#042135"],resize:!0}))})}}}),angular.module("quizSurveyApp").directive("gaugeChart",[function(){return{restrict:"A",scope:{data:"=",options:"="},link:function(a,b){var c=a.data,d=a.options,e=new Gauge(b[0]).setOptions(d);e.maxValue=c.maxValue,e.animationSpeed=c.animationSpeed,e.set(c.val)}}}]),angular.module("quizSurveyApp").directive("wrapOwlcarousel",function(){return{restrict:"E",link:function(a,b){var c=a.$eval(angular.element(b).attr("data-options"));angular.element(b).owlCarousel(c)}}}),angular.module("quizSurveyApp").directive("todoFocus",["$timeout",function(a){return{restrict:"A",link:function(b,c,d){b.$watch(d.todoFocus,function(b){b&&a(function(){c[0].focus()},0,!1)})}}}]),angular.module("quizSurveyApp").directive("todoEscape",function(){var a=27;return{restrict:"A",link:function(b,c,d){c.bind("keydown",function(c){c.keyCode===a&&b.$apply(d.todoEscape)})}}}),angular.module("quizSurveyApp").directive("clock",function(){return{restrict:"EA",replace:!0,scope:{radius:"@",zone:"@?",lightFill:"@?",darkFill:"@?"},template:'<div class=\'bloc-clock\' ng-style=\'divStyle()\'>\n  <svg xmlns="http://www.w3.org/2000/svg"\n   style="padding: 10px 0"\n    width="100%"\n       height="100%"\n       viewBox="0 0 200 200">\n    <g class=\'face\' style=\'stroke: black; stroke-width: 0px;\'>\n      <g>\n        <circle style="stroke: rgba(255,255,255,.5); fill: rgba(255,255,255,0); stroke-width: 6px;"\n                cx="100"\n                cy="100"\n                r="100"/>\n        <line x1="100"\n              x2="100"\n              y1="10"\n              y2="0"\n              />\n        <line x1="150"\n              x2="145"\n              y1="13"\n              y2="22"\n              />\n        <line x1="150"\n              x2="145"\n              y1="13"\n              y2="22"\n              />\n        <line x1="187"\n              x2="178"\n              y1="50"\n              y2="55"\n              />\n        <line x1="190"\n              x2="200"\n              y1="100"\n              y2="100"\n              />\n        <line x1="187"\n              x2="178"\n              y1="150"\n              y2="145"\n              />\n        <line x1="150"\n              x2="145"\n              y1="187"\n              y2="178"\n              />\n        <line x1="100"\n              x2="100"\n              y1="190"\n              y2="200"\n              />\n        <line x1="50"\n              x2="55"\n              y1="187"\n              y2="178"\n              />\n        <line x1="13"\n              x2="22"\n              y1="150"\n              y2="145"\n              />\n        <line x1="0"\n              x2="10"\n              y1="100"\n              y2="100"\n              />\n        <line x1="13"\n              x2="22"\n              y1="50"\n              y2="55"\n              />\n        <line x1="50"\n              x2="55"\n              y1="13"\n              y2="22"\n              />\n      </g>\n      <g>\n          <line x1="100"\n                y1="100"\n                x2="100"\n                y2="45"\n                style="stroke-width: 6px"\n                class="hourhand"/>\n          <line x1="100"\n                y1="100"\n                x2="100"\n                y2="15"\n                style="stroke-width: 6px"\n                class="minutehand" />\n          <line x1="100"\n                y1="100"\n                x2="100"\n                y2="5"\n                style="stroke-width: 3px; stroke: rgba(255,255,255,.5)"\n                class="secondhand"/>\n      <circle cx="100"\n cy="100"\n r="8"\n fill="white"\n />\n   </g>\n    </g>\n  </svg>\n</div>',link:function(a,b){var c,d,e,f;a.divStyle=function(){return{width:a.w(),height:a.w(),margin:"0 auto"}},a.w=function(){return 2*a.radius},e=function(a,b,c,e){var f;return e=e||b,f=c||1,e+b*f*Math.cos(d(a))},f=function(a,b,c,e){var f;return e=e||b,f=c||1,e+b*f*Math.sin(d(a))},d=function(a){var b;return b=Math.PI/2,a*Math.PI/180-b},c=function(){var c,d,g,h,i,j,k,l,m,n,o;h=.95,g=.85,d=.55,o=a.zone?moment.tz(new Date,a.zone):moment(),m=100,c=b.find("circle"),l=Number(o.format("H")),i=l>=18||6>l,n="rgba(255,255,255,1)",b.find("line").not(".secondhand").css("stroke",n),j=function(a,b,c,d){var g,h,i;g=d*b,h=e(g,m,c,m),i=f(g,m,c,m),a.attr("x1",m),a.attr("y1",m),a.attr("x2",h),a.attr("y2",i)},k=o.hour()+o.minute()/60,j(angular.element(b).find(".secondhand"),o.second(),h,6),j(angular.element(b).find(".minutehand"),o.minute(),g,6),j(angular.element(b).find(".hourhand"),k,d,30)},c(),setInterval(c,1e3)}}}),angular.module("quizSurveyApp").directive("activeToggle",function(){return{restrict:"A",link:function(a,b,c){b.on("click",function(){var a=angular.element(c.target)||Array(b);b.hasClass("active")?(b.removeClass("active"),a.removeClass("show")):(b.addClass("active"),a.addClass("show"))})}}}),angular.module("quizSurveyApp").directive("vectorMap",function(){return{restrict:"AE",scope:{options:"="},link:function(a,b){var c=a.options;b.vectorMap(c)}}}),angular.module("quizSurveyApp").controller("MailCtrl",["$scope",function(){}]),angular.module("quizSurveyApp").directive("anchorScroll",["$location","$anchorScroll",function(a,b){return{restrict:"AC",link:function(c,d,e){d.on("click",function(){a.hash(e.anchorScroll),b()})}}}]),angular.module("quizSurveyApp").factory("quizSurveyFactory",["$http","$q",function(a,b){var c="/api/",d=function(){var d=b.defer();return a({url:c+"QuizSurveys",method:"GET"}).success(function(a){d.resolve(a)}).error(function(){d.reject()}),d.promise},e=function(){var d=b.defer();return a({url:c+"public/QuizSurveys",method:"GET"}).success(function(a){d.resolve(a)}).error(function(){d.reject()}),d.promise},f=function(d){var e=b.defer();return a({url:c+"QuizSurveys/"+d,method:"GET"}).success(function(a){e.resolve(a)}).error(function(){e.reject()}),e.promise},g=function(d){var e=b.defer();return a({url:c+"QuizSurveys",method:"POST",data:d}).success(function(a){e.resolve(a)}).error(function(){e.reject()}),e.promise},h=function(d,e){var f=b.defer();return a({url:c+"QuizSurveys/"+d,method:"PUT",data:e}).success(function(a){f.resolve(a)}).error(function(){f.reject()}),f.promise},i=function(d){var e=b.defer();return a({url:c+"QuizSurveys/"+d,method:"DELETE"}).success(function(a){e.resolve(a)}).error(function(){e.reject()}),e.promise},j=function(d){var e=b.defer();return a({url:c+"QuizAttendees/"+d,method:"GET"}).success(function(a){e.resolve(a)}).error(function(){e.reject()}),e.promise},k=function(d){var e=b.defer();return a({url:c+"QuizTakers",method:"POST",data:d}).success(function(a){e.resolve(a)}).error(function(){e.reject()}),e.promise},l=function(d){var e=b.defer();return a({url:c+"public/Share",method:"POST",data:d}).success(function(a){e.resolve(a)}).error(function(){e.reject()}),e.promise},m=function(d,e){var f=b.defer(),g={QuestionTitle:"",QuestionDescription:"",QuizOrSurveyId:d};return g.QuestionDescription=e.description,g.QuestionTitle=e.title,a({url:c+"Questions",method:"POST",data:g}).success(function(a){f.resolve(a),n(a.QuestionId,e.answers).then(function(a){console.log(a)})}).error(function(){f.reject()}),f.promise},n=function(d,e){var f={IsCorrectAnswer:"",Answertitle:"",QuestinId:d},g=b.defer();return f.IsCorrectAnswer=e.isCorrect,f.Answertitle=e.answer,console.log(f),a({url:c+"Answers",method:"POST",data:f}).success(function(a){g.resolve(a)}).error(function(){g.reject()}),g.promise},o=function(d){var e=b.defer();return a({url:c+"AllAnswers/"+d,method:"GET"}).success(function(a){e.resolve(a)}).error(function(){e.reject()}),e.promise},p=function(d){var e=b.defer();return a({url:c+"QuestionAnswers",method:"POST",data:d}).success(function(a){e.resolve(a)}).error(function(){e.reject()}),e.promise};return{getAll:d,getAllPublic:e,getQuiz:f,createQuiz:g,putQuiz:h,deleteQuiz:i,getQuizAttendees:j,createQuizTaker:k,createQuestionAnswer:p,addQuestion:m,addAnswers:n,getAnswers:o,shareQuiz:l}}]),angular.module("quizSurveyApp").factory("userAuthFactory",["$http","$q","$window",function(a,b){var c="/",d=function(d){var e=b.defer();return a({url:c+"Token",headers:{"Content-Type":"application/x-www-form-urlencoded"},method:"POST",data:"grant_type=password&username="+d.email+"&password="+d.password}).success(function(a){var b=a.access_token;localStorage.setItem("token",b),localStorage.setItem("userName",a.userName),e.resolve(a.userName)}).error(function(a){e.reject(a)}),e.promise},e=function(d){var e=b.defer();return a({url:c+"api/account/register",method:"POST",data:d}).success(function(a){e.resolve(a)}).error(function(){e.reject()}),e.promise},f=function(){return localStorage.getItem("token")},g=function(){return localStorage.removeItem("token"),!0};return{login:d,signup:e,logout:g,isLoggedIn:f}}]),angular.module("quizSurveyApp").factory("authInterceptorService",["$q","$location",function(a,b){var c={},d=function(a){a.headers=a.headers||{};var b=localStorage.getItem("token");return b&&(a.headers.Authorization="Bearer "+b),a},e=function(c){return 401===c.status&&b.path("/app/user/login"),a.reject(c)};return c.request=d,c.responseError=e,c}]);