package com.techgeeknext.model;

import com.techgeeknext.entities.Role;

public class UserDto {
    private String username;
    private String password;
    private String phone;
    private String name;
    private Role role;
    private Boolean arch;
    private Long store;

    public void setIdStore(Long idStore) {
        this.store = idStore;
    }

    public Long getIdStore() {
        return store;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Role getRole() {
        return role;
    }

    public Boolean getArch() {
        return arch;
    }

    public void setArch(Boolean arch) {
        this.arch = arch;
    }

    public void setRole(Role role) {
        this.role = role;
    }

}
