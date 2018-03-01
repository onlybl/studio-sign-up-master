package com.iotstudio.studiosignup.service;

import com.iotstudio.studiosignup.object.entity.SighUpInfo;
import com.iotstudio.studiosignup.util.model.ResponseModel;

import javax.servlet.http.HttpServletResponse;

public interface SighUpInfoService extends BaseService<SighUpInfo> {
    ResponseModel addOne(SighUpInfo sighUpInfo,Integer userId, String projectName);
    ResponseModel addOne(SighUpInfo sighUpInfo,String username, String projectName);
    ResponseModel updateOne(SighUpInfo sighUpInfo,Integer userId,Integer projectId,Integer sighUpInfoId);
    ResponseModel selectSighUpInfoByUserIdAndProjectId(Integer userId,Integer projectId,HttpServletResponse response);
    ResponseModel updateCheckCodeByUserIdAndProjectIdAndSighUpInfoId(Integer checkCode, Integer userId, Integer projectId,Integer sighUpInfoId);
    ResponseModel updateCheckCodeByUserIdAndSighUpInfoId(Integer checkCode, Integer userId,Integer sighUpInfoId);
    ResponseModel findSighUpInfosByProjectId(Integer projectId);
    ResponseModel findSighUpInfosByUserId(Integer userId);
    ResponseModel updateSighUpInfoById(Integer projectId, Integer sighUpInfoId, String teacherRemark);
}
