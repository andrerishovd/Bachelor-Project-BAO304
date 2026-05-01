package kristiania.chat.configuration;

import org.jasypt.encryption.StringEncryptor;
import org.jasypt.encryption.pbe.PooledPBEStringEncryptor;
import org.jasypt.encryption.pbe.config.SimpleStringPBEConfig;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

//@Configuration
public class JasyptConfig {

    /*

    @Value("${jasypt.encryptor.password}")
    private String password;
    @Value("${jasypt.encryptor.algorithm}")
    private String algorithm;
    @Value("${jasypt.encryptor.iv-generator-classname}")
    private String ivGenerator;

    @Bean(name = "jasyptStringEncryptor")
    @Primary
    public StringEncryptor stringEncryptor() {
        PooledPBEStringEncryptor encryptor = new PooledPBEStringEncryptor();
        SimpleStringPBEConfig config = new SimpleStringPBEConfig();

        config.setPassword(password);
        config.setAlgorithm(algorithm);
        config.setKeyObtentionIterations("1000");
        config.setPoolSize("1");
        //config.setSaltGeneratorClassName("org.jasypt.salt.RandomSaltGenerator");
        config.setIvGeneratorClassName(ivGenerator);
        config.setStringOutputType("base64");

        encryptor.setConfig(config);
        return encryptor;
    }
     */
}
