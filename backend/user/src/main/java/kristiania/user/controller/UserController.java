package kristiania.user.controller;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.ui.Model;

@Controller
@RequestMapping("/")
public class UserController {
    @GetMapping
    public String index(Model model, Authentication user){
        model.addAttribute("user", user);
        return "index";
    }
}
