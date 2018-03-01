package com.iotstudio.studiosignup.object.entity;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
public class SighUpInfo extends BaseEntity {

    @ManyToOne(cascade = {CascadeType.REFRESH,CascadeType.MERGE})
    @JoinColumn(name = "project_id",referencedColumnName = "id")
    private Project project;//项目类型

    @ManyToOne(cascade = {CascadeType.MERGE,CascadeType.REFRESH})
    @JoinColumn(name = "user_id",referencedColumnName = "id")
    private User user;//学生

    @NotNull
    private String personalIntroduction;//个人介绍

    private String teacherRemark;//老师备注

    @Column(insertable = false)
    private Integer checkCode;//审核代码,1:待审核，2:未通过

    public SighUpInfo() {
    }

    public SighUpInfo(Project project, User user, String personalIntroduction, String teacherRemark, Integer checkCode) {
        this.project = project;
        this.user = user;
        this.personalIntroduction = personalIntroduction;
        this.teacherRemark = teacherRemark;
        this.checkCode = checkCode;
    }

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getPersonalIntroduction() {
        return personalIntroduction;
    }

    public void setPersonalIntroduction(String personalIntroduction) {
        this.personalIntroduction = personalIntroduction;
    }

    public String getTeacherRemark() {
        return teacherRemark;
    }

    public void setTeacherRemark(String teacherRemark) {
        this.teacherRemark = teacherRemark;
    }

    public Integer getCheckCode() {
        return checkCode;
    }

    public void setCheckCode(Integer checkCode) {
        this.checkCode = checkCode;
    }
}
