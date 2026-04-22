package kristiania.user.service;

import kristiania.user.dto.UserDto;
import kristiania.user.modules.User;
import kristiania.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
// INTERNAL TOOLS
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    private UserDto convertUserToUserDto(User user) {
        return new UserDto(String.valueOf(user.getId()), user.getEntraId(), user.getEmail());
    }

    private List<UserDto> convertUserListToUserDtoList(List<User> userList) {
        List<UserDto> userDtoList = new ArrayList<>();
        for(User user : userList) {
            userDtoList.add(convertUserToUserDto(user));
        }
        return userDtoList;
    }

    private User convertUserDtoToUser(UserDto userDto) {
        return new User(userDto.oid(), userDto.email());
    }

    private User verifyUser(String authorizationHeader) {
        return new User();
    }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
// GET
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    public UserDto getUserDtoFromId(String id) {
        return convertUserToUserDto(userRepository.getReferenceById(Long.valueOf(id)));
    }

    public List<UserDto> getAllUsersDto() {
        return convertUserListToUserDtoList(userRepository.findAll());
    }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
// POST
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

    public String saveUser(String authorizationHeader) {
        User user = verifyUser(authorizationHeader);
        User verifiedUser = userRepository.save(user);
        return String.valueOf(verifiedUser.getId());
    }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
// DELETE
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

    public Void deleteAllUsers() {
        userRepository.deleteAll();
        return null;
    }

    public Void deleteUserFromId(String id) {
        userRepository.deleteById(Long.valueOf(id));
        return null;
    }
}
