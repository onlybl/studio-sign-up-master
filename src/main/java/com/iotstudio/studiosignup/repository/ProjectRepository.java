package com.iotstudio.studiosignup.repository;

import com.iotstudio.studiosignup.object.entity.Project;
import com.iotstudio.studiosignup.object.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProjectRepository extends JpaRepository<Project,Integer> {
    Project findProjectByName(String name);

    List<Project> findAllByUser(User user);

    @Query(value = "SELECT * FROM project WHERE id NOT IN (SELECT project_id FROM sigh_up_info WHERE user_id = ?1)",nativeQuery = true)
    List<Project> findOddByUser(Integer userId);

    Project findProjectByUserAndId(User user,Integer projectId);
}
