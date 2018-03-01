var urlPrefix='http://localhost:8080/ssu';//url前缀  本机调试

//修改个人信息
function saveChange(){
    //个人信息写入
    $.ajax({
        type:'get',
        url:urlPrefix+"/v1/getUserStudentInfo",
        data:"client_id="+$.cookie('client_id')+"&digest="+$.cookie('digest'),
        success:function (data) {
            $("form#mod input:eq(0)").val(data.data.username);
            $("form#mod input:eq(1)").val(data.data.realName);
            $("form#mod input:eq(2)").val(data.data.studentNumber);
            $("form#mod input:eq(3)").val(data.data.major);
            $("form#mod input:eq(4)").val(data.data.phone);
            $("form#mod input:eq(5)").val(data.data.qqNumber);
            $.ajax({
                type:'post',
                url: '',
                data:$("#mod").serialize()+"&client_id="+$.cookie('client_id')+"&digest="+$.cookie('digest'),
                success: function (data) {
                    window.location.href="user.html";
                }
            });
        }
    });
}


//页面转换相关函数

function change1(){
    $("#pro1").show();
    $("#pro2").hide();
}
function change2(){
    $("#pro1").hide();
    $("#pro2").show();
}

//项目申请提交方法
var projectName;
var personalIntroduction;
var id;
function fillIntroduction(obj) {
    $('#myModal2').modal('show');
    id=$(obj).parent().parent().index();
    id--;
}
function introductionSubmit(){
    $.ajax({
        type:'get',
        url:urlPrefix+"/v1/project",
        data:"client_id="+$.cookie('client_id')+"&digest="+$.cookie('digest'),
        success:function (data) {
            projectName=data.data.content[id].name;
            personalIntroduction=$("textarea#personalIntroduction").val();
            $.ajax({
                type:'post',
                url:urlPrefix+"/v1/sighUp?"+"client_id="+$.cookie('client_id')+"&digest="+$.cookie('digest'),
                data:{
                    projectName:projectName,
                    personalIntroduction:personalIntroduction
                },
                success:function(){
                    alert("申请成功！刷新查看");
                    $('#myModal2').modal('hide');
                }
            })
        }
    });

}


//------------------------------------addProject.html页面js文件-------------------------------------

//新增项目方法
function submitProject() {
    introduction=$("#projectInfo #introduction").val();
    projectName=$("#projectInfo input").val();
    if(introduction==''||projectName==''){
        alert("内容不能为空！")
    }else{
        $.ajax({
            type:'post',
            url:urlPrefix+"/v1/user/"+$.cookie('client_id')+"/project",
            data:$("#projectInfo").serialize()+"&client_id="+$.cookie('client_id')+"&digest="+$.cookie('digest'),
            success:function (data) {
                if(data.successful==true){
                    alert("添加成功！");
                    window.location.href="projectList.html";
                } else{
                    alert("添加失败！");
                    window.location.href="addProject.html";
                }
            }
        })
    }

}

//注销方法
function logOut() {
    $.ajax({
        type:'delete',
        url:urlPrefix+"/v1/logout",
        data:"client_id="+$.cookie('client_id')+"&digest="+$.cookie('digest'),
        success:function (data){
            if(data.successful==true){
                alert("注销成功！");
                window.close();
                window.location.href="login.html";
            }
        }
    })
}
//项目简介模态框显示
function showProject(obj) {
    var proIndex=$(obj).parent().parent().index();
    proIndex--;
    $.ajax({
        type:'get',
        url:urlPrefix+"/v1/project/"+$.cookie('client_id')+"/project",
        data:"&client_id="+$.cookie('client_id')+"&digest="+$.cookie('digest'),
        success:function (data) {
            $("textarea#introduction").text(data.data[proIndex].introduction);
        }
    })
}

// ----------------------------------------applyMessage.html js文件----------------------------------------

var projectIndex;//所点击项目在表中的索引
var projectId;//所点击项目的ID
function getProjectIndex (obj) {
    projectIndex=$(obj).parent().parent().index();
    projectIndex--;
    $.ajax({
        type:'get',
        url: urlPrefix+"/v1/user/"+$.cookie('client_id')+"/project",
        data:"client_id="+$.cookie('client_id')+"&digest="+$.cookie('digest'),
        success: function (data) {
            projectId =data.data[projectIndex].id;
            $.cookie('projectId',projectId,{path:'/'});
            window.location.href="applyMessageTable.html";
        }
    })
}
function getInterviewIndex(obj) {
    projectIndex=$(obj).parent().parent().index();
    projectIndex--;
    $.ajax({
        type:'get',
        url: urlPrefix+"/v1/user/"+$.cookie('client_id')+"/project",
        data:"client_id="+$.cookie('client_id')+"&digest="+$.cookie('digest'),
        success: function (data) {
            projectId =data.data[projectIndex].id;
            $.cookie('projectId',projectId,{path:'/'});
            window.location.href="interviewMessage.html";
        }
    })
}

// --------------------------------------applyMessageTable.html js文件--------------------------------------
//报名信息详情加载
function loadSignUpMessage(){

    $.ajax({
        type:'get',
        url:urlPrefix+"/v1/project/"+$.cookie('projectId')+"/sighUpInfo?",
        data:"client_id="+$.cookie('client_id')+"&digest="+$.cookie('digest'),
        success:function (data) {                                               //循环写入表格数据
            for(var i=0;i<data.data.length;i++){
                $('tr.odd').remove();
                $("div#projectMsgTable_length").remove();
                $("div.dataTables_filter").remove();
                $("tbody").append("<tr><td></td><td></td><td></td><td></td><td class="+"noExl"+"></td><td class="+"noExl"+"></td><td class="+"noExl"+"></td></tr>");
                $("tbody tr:eq("+i+") td:eq(0)").text(data.data[i].username);
                $("tbody tr:eq("+i+") td:eq(1)").text(data.data[i].realName);
                $("tbody tr:eq("+i+") td:eq(2)").text(data.data[i].major);
                $("tbody tr:eq("+i+") td:eq(3)").text(data.data[i].phone);
                $("tbody tr:eq("+i+") td:eq(4)").append("<button class="+"'btn btn-info'"+" style="+"'height: 28px; width: 60%; margin-left: 15%; padding: 5px 15px;'"+" data-toggle="+ "'modal'"+" data-target="+"'#studentMsg'"+" onmouseover="+"'showStudentMsg(this)'"+">个人简介</button>");
                $("tbody tr:eq("+i+") td:eq(5)").append("<form style="+"'text-align: center;'"+"></form>");
                $("tbody tr:eq("+i+") td:eq(5) form").append("<label>状态:</label>");
                $("tbody tr:eq("+i+") td:eq(5) form").append("<select style="+"'height: 25px;'"+"></select>");
                $("tbody tr:eq("+i+") td:eq(5) form select").append("<option value="+1+">待审核</option>");
                $("tbody tr:eq("+i+") td:eq(5) form select").append("<option value="+2+">通过</option>");
                $("tbody tr:eq("+i+") td:eq(5) form select").append("<option value="+3+">拒绝</option>");
                $("tbody tr:eq("+i+") td:eq(6)").append("<button style="+"'display: block;margin: 0 auto;'"+" data-toggle="+ "'modal'"+" data-target="+"'#remark'"+" class="+"'btn btn-default'"+" onclick='showRemark(this)'"+">备注</button>");
                if(data.data[i].checkCode==1){
                    $("tbody tr:eq("+i+") td:eq(5) form select option:eq(0)").attr('selected',true);
                }else if(data.data[i].checkCode==2){
                    $("tbody tr:eq("+i+") td:eq(5) form select option:eq(1)").attr('selected',true);
                }else if(data.data[i].checkCode==3){
                    $("tbody tr:eq("+i+") td:eq(5) form select option:eq(2)").attr('selected',true);
                }

            }

            //下拉框监听
            var userId;                //要修改状态的用户ID
            var signUpInfoId;          //要修改的该用户的报名信息的ID
            $("form select").change(function (){
                    var selectNum=$(this).parent().parent().parent().index();//要修改的报名信息在数组中的位置
                if($("tbody select:eq("+selectNum+") option:selected").text()=="通过"){
                    $.ajax({
                        type:'get',
                        url:urlPrefix+"/v1/project/"+$.cookie('projectId')+"/sighUpInfo?",
                        data:"client_id="+$.cookie('client_id')+"&digest="+$.cookie('digest'),
                        success:function () {
                            userId=data.data[selectNum].userId;
                            signUpInfoId=data.data[selectNum].sighUpInfoId;
                            $.ajax({
                                type:'patch',
                                url:urlPrefix+"/v1/user/"+userId+"/sighUpInfo/"+signUpInfoId,
                                data: {
                                    checkCode:2,
                                    client_id:$.cookie('client_id'),
                                       digest:$.cookie('digest')
                                    }
                                })
                            }
                        })
                    }else if($("tbody select:eq("+selectNum+") option:selected").text()=="拒绝"){
                        $.ajax({
                            type:'get',
                            url:urlPrefix+"/v1/project/"+$.cookie('projectId')+"/sighUpInfo?",
                            data:"client_id="+$.cookie('client_id')+"&digest="+$.cookie('digest'),
                            success:function () {
                                userId=data.data[selectNum].userId;
                                signUpInfoId=data.data[selectNum].sighUpInfoId;
                                $.ajax({
                                    type:'patch',
                                    url:urlPrefix+"/v1/user/"+userId+"/sighUpInfo/"+signUpInfoId,
                                    data: {
                                        checkCode: 3,
                                        client_id:$.cookie('client_id'),
                                        digest:$.cookie('digest')
                                    }
                                })
                            }
                        })
                    }
                }
            );
        }
    })
}

// --------------------------------------interviewMessage.html js文件--------------------------------------
var temp=0;
var maxCapacity;//成员总人数
//面试成员信息详情加载
function loadInterviewMessage(){
    maxCapacity=3;
    $("tbody input:eq(0)").val("第"+(temp+1)+"页");
    $.ajax({
        type:'get',
        url:'',
        data:"client_id="+$.cookie('client_id')+"&digest="+$.cookie('digest'),
        success:function (data) {
            //将第一位成员信息写入页面
            maxCapacity=data.length;
            $("tbody tr:eq(0) td:eq(0)").text();
            $("tbody tr:eq(0) td:eq(1)").text();
        }

    })
}
//获取下一成员信息
function getNext() {
    temp++;
    if(temp<=maxCapacity){
        $.ajax({
            type:"get",
            url:'',
            data:"client_id="+$.cookie('client_id')+"&digest="+$.cookie('digest'),
            success:function (data) {
                //将下一位成员信息写入页面
                $("tbody tr:eq(0) td:eq(0)").text();
                $("tbody tr:eq(0) td:eq(1)").text();
            }
        })
    }else{
        confirm("已浏览全部成员！")
    }

}
//获取上一成员信息
function getLast() {
    temp--;
    if(temp>=0){
        $.ajax({
            type:"get",
            url:'',
            data:"client_id="+$.cookie('client_id')+"&digest="+$.cookie('digest'),
            success:function (data) {
                //将上一位成员的信息写入页面
                $("tbody tr:eq(0) td:eq(0)").text();
                $("tbody tr:eq(0) td:eq(1)").text();
            }
        })
    }else{
        confirm("已停留在第一位成员！");
    }
}
//跳转至指定页面方法
var appoint;
function getAppoint() {
    appoint=$("tbody input:eq(1)").val();
    alert(appoint);
    alert(maxCapacity);
    if(appoint<=0||appoint>maxCapacity){
        confirm("页数超出界限!")
    }else{
        appoint--;
        temp=appoint;
        $.ajax({
            type:"get",
            url:'',
            data:"client_id="+$.cookie('client_id')+"&digest="+$.cookie('digest'),
            success:function (data) {
                //将上一位成员的信息写入页面
                $("tbody tr:eq(0) td:eq(0)").text();
                $("tbody tr:eq(0) td:eq(1)").text();
                $("tbody input:eq(0)").val("第"+(appoint+1)+"页");
            }
        })
    }
}

// --------------------------------------applyPassedTable.html js文件--------------------------------------

function loadApplyPassedTable(){

    $.ajax({
        type:'get',
        url:urlPrefix+"/v1/project/"+$.cookie('projectId')+"/sighUpInfo?",
        data:"client_id="+$.cookie('client_id')+"&digest="+$.cookie('digest'),
        success:function (data) {                                               //循环写入表格数据
            for(var i=0;i<data.data.length;i++){
                if(data.data[i].checkCode==2){
                $('tr.odd').remove();
                $("div#projectMsgTable_length").remove();
                $("div.dataTables_filter").remove();
                $("tbody").append("<tr><td></td><td></td><td></td><td></td><td class="+"noExl"+"></td><td class="+"noExl"+"></td><td class="+"noExl"+"></td></tr>");
                $("tbody tr:eq("+i+") td:eq(0)").text(data.data[i].username);
                $("tbody tr:eq("+i+") td:eq(1)").text(data.data[i].realName);
                $("tbody tr:eq("+i+") td:eq(2)").text(data.data[i].major);
                $("tbody tr:eq("+i+") td:eq(3)").text(data.data[i].phone);
                $("tbody tr:eq("+i+") td:eq(4)").append("<button class="+"'btn btn-info'"+" style="+"'height: 28px; width: 60%; margin-left: 15%; padding: 5px 15px;'"+" data-toggle="+ "'modal'"+" data-target="+"'#studentMsg'"+" onmouseover="+"'showStudentMsg(this)'"+">个人简介</button>");
                $("tbody tr:eq("+i+") td:eq(5)").append("<form style="+"'text-align: center;'"+"></form>");
                $("tbody tr:eq("+i+") td:eq(5) form").append("<label>状态:</label>");
                $("tbody tr:eq("+i+") td:eq(5) form").append("<select style="+"'height: 25px;'"+"></select>");
                $("tbody tr:eq("+i+") td:eq(5) form select").append("<option value="+1+">待审核</option>");
                $("tbody tr:eq("+i+") td:eq(5) form select").append("<option value="+2+">通过</option>");
                $("tbody tr:eq("+i+") td:eq(5) form select").append("<option value="+3+">拒绝</option>");
                $("tbody tr:eq("+i+") td:eq(6)").append("<button style="+"'display: block;margin: 0 auto;'"+" data-toggle="+ "'modal'"+" data-target="+"'#remark'"+" class="+"'btn btn-default'"+" onclick='showRemark(this)'"+">备注</button>");
                if(data.data[i].checkCode==1){
                    $("tbody tr:eq("+i+") td:eq(5) form select option:eq(0)").attr('selected',true);
                }else if(data.data[i].checkCode==2){
                    $("tbody tr:eq("+i+") td:eq(5) form select option:eq(1)").attr('selected',true);
                }else if(data.data[i].checkCode==3){
                    $("tbody tr:eq("+i+") td:eq(5) form select option:eq(2)").attr('selected',true);
                }
                }
            }

            //下拉框监听
            var userId;                //要修改状态的用户ID
            var signUpInfoId;          //要修改的该用户的报名信息的ID
            $("form select").change(function (){
                    var selectNum=$(this).parent().parent().parent().index();//要修改的报名信息在数组中的位置
                    if($("tbody select:eq("+selectNum+") option:selected").text()=="通过"){
                        $.ajax({
                            type:'get',
                            url:urlPrefix+"/v1/project/"+$.cookie('projectId')+"/sighUpInfo?",
                            data:"client_id="+$.cookie('client_id')+"&digest="+$.cookie('digest'),
                            success:function () {
                                userId=data.data[selectNum].userId;
                                signUpInfoId=data.data[selectNum].sighUpInfoId;
                                $.ajax({
                                    type:'patch',
                                    url:urlPrefix+"/v1/user/"+userId+"/sighUpInfo/"+signUpInfoId,
                                    data: {
                                        checkCode:2,
                                        client_id:$.cookie('client_id'),
                                        digest:$.cookie('digest')
                                    }
                                })
                            }
                        })
                    }else if($("tbody select:eq("+selectNum+") option:selected").text()=="拒绝"){
                        $.ajax({
                            type:'get',
                            url:urlPrefix+"/v1/project/"+$.cookie('projectId')+"/sighUpInfo?",
                            data:"client_id="+$.cookie('client_id')+"&digest="+$.cookie('digest'),
                            success:function () {
                                userId=data.data[selectNum].userId;
                                signUpInfoId=data.data[selectNum].sighUpInfoId;
                                $.ajax({
                                    type:'patch',
                                    url:urlPrefix+"/v1/user/"+userId+"/sighUpInfo/"+signUpInfoId,
                                    data: {
                                        checkCode: 3,
                                        client_id:$.cookie('client_id'),
                                        digest:$.cookie('digest')
                                    }
                                })
                            }
                        })
                    }
                }
            );
        }
    })
}