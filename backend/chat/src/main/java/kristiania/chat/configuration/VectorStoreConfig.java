package kristiania.chat.configuration;

import org.springframework.ai.embedding.EmbeddingModel;
import org.springframework.ai.vectorstore.VectorStore;
import org.springframework.ai.vectorstore.pgvector.PgVectorStore;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.jdbc.autoconfigure.DataSourceProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.jdbc.core.JdbcTemplate;

import javax.sql.DataSource;

@Configuration
public class VectorStoreConfig {

    @Primary
    @Bean(name = "chatDataSourceProperties")
    @ConfigurationProperties("spring.datasource")
    public DataSourceProperties chatDataSourceProperties() {
        return new DataSourceProperties();
    }

    @Primary
    @Bean(name = "dataSource")
    public DataSource chatDataSource(
        @Qualifier("chatDataSourceProperties") DataSourceProperties properties
    ) {
        return properties.initializeDataSourceBuilder().build();
    }

    @Bean(name = "vectorDataSourceProperties")
    @ConfigurationProperties("app.vector.datasource")
    public DataSourceProperties vectorDataSourceProperties() {
        return new DataSourceProperties();
    }

    @Bean(name = "vectorDataSource")
    public DataSource vectorDataSource(
        @Qualifier("vectorDataSourceProperties") DataSourceProperties properties
    ) {
        return properties.initializeDataSourceBuilder().build();
    }

    @Bean(name = "vectorJdbcTemplate")
    public JdbcTemplate vectorJdbcTemplate(
        @Qualifier("vectorDataSource") DataSource vectorDataSource
    ) {
        return new JdbcTemplate(vectorDataSource);
    }

    @Bean(name = "vectorStore")
    public VectorStore vectorStore(
        @Qualifier("vectorJdbcTemplate") JdbcTemplate vectorJdbcTemplate,
        EmbeddingModel embeddingModel
    ) {
        return PgVectorStore.builder(vectorJdbcTemplate, embeddingModel)
            .initializeSchema(true)
            .dimensions(1536)
            .build();
    }
}
