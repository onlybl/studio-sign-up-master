package com.iotstudio.studiosignup.repository;

import com.iotstudio.studiosignup.object.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UserRepository extends JpaRepository<User,Integer> {
    User findByUsername(String username);

    @Query(value = "DELETE FROM sigh_up_info WHERE id=?1",nativeQuery = true)
    int userDeleteOneBySighUpInfoId(Integer sighUpInfoId);
}
