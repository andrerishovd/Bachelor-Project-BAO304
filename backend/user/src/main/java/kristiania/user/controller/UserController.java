package kristiania.user.controller;

import kristiania.user.dto.UserDto;
import kristiania.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user")
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
// GET
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    @GetMapping("/all")
    public ResponseEntity<List<UserDto>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsersDto());
    }

    @GetMapping("/id/{id}")
    public ResponseEntity<UserDto> getUserFromId(@PathVariable String id) {
        return ResponseEntity.ok(userService.getUserDtoFromId(id));
    }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
// POST
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

    @PostMapping("/new")
    public ResponseEntity<String> postNewUser(@RequestHeader("Authorization") String authorizationHeader) {
        return ResponseEntity.ok(userService.saveUser(authorizationHeader));
    }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
// DELETE
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

    @DeleteMapping("/delete/all")
    public ResponseEntity<Void> deleteAllUsers() {
        return ResponseEntity.ok(userService.deleteAllUsers());
    }

    @DeleteMapping("/delete/id/{id}")
    public ResponseEntity<Void> deleteUserFromId(@PathVariable String id) {
        return ResponseEntity.ok(userService.deleteUserFromId(id));
    }
}
