package com.techgeeknext.service;

import com.techgeeknext.dao.AdminDao;
import com.techgeeknext.dao.StoreRepository;
import com.techgeeknext.entities.Admin;
import com.techgeeknext.entities.Role;
import com.techgeeknext.model.UserDto;
import com.techgeeknext.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class JwtUserDetailsService implements UserDetailsService {
	@Autowired
	private UserRepository userDao;

	@Autowired
	private PasswordEncoder bcryptEncoder;

	@Autowired
	private StoreRepository storeRespository;

	@Autowired
	private AdminDao adminDao;



	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Admin user = userDao.findByUsername(username);
		if (user == null) {
			throw new UsernameNotFoundException("User not found with username: " + username);
		}
		return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(),
				new ArrayList<>());
	}

	public Admin save(UserDto user) {
		Admin newUser = new Admin();
		newUser.setUsername(user.getUsername());
		newUser.setName(user.getName());
		newUser.setPhone(user.getPhone());
		newUser.setPassword(bcryptEncoder.encode(user.getPassword()));
		newUser.setRole(Role.NORMAL);
		newUser.setArch(false);
		return userDao.save(newUser);
	}
}