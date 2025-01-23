<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250122235437 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE admins (id INT AUTO_INCREMENT NOT NULL, email VARCHAR(180) NOT NULL, roles JSON NOT NULL, password VARCHAR(255) NOT NULL, name VARCHAR(255) NOT NULL, position VARCHAR(255) NOT NULL, created_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', UNIQUE INDEX UNIQ_IDENTIFIER_EMAIL (email), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE congregation_offerings (id INT AUTO_INCREMENT NOT NULL, congregation_id INT DEFAULT NULL, value NUMERIC(10, 2) NOT NULL, date DATETIME NOT NULL, INDEX IDX_B46200E12D82FAA1 (congregation_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE congregations (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, town VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE members (id INT AUTO_INCREMENT NOT NULL, congregation_id INT DEFAULT NULL, full_name VARCHAR(255) NOT NULL, birth_date DATE NOT NULL, telphone VARCHAR(100) NOT NULL, is_baptized_in_water TINYINT(1) NOT NULL, is_baptized_in_holy_spirit TINYINT(1) NOT NULL, marital_status VARCHAR(255) NOT NULL, is_tither TINYINT(1) DEFAULT NULL, created_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', INDEX IDX_45A0D2FF2D82FAA1 (congregation_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE tithes (id INT AUTO_INCREMENT NOT NULL, the_member_id INT DEFAULT NULL, congregation_id INT DEFAULT NULL, value NUMERIC(10, 2) NOT NULL, object VARCHAR(255) DEFAULT NULL, date DATETIME NOT NULL, INDEX IDX_C64CE97FA1656A89 (the_member_id), INDEX IDX_C64CE97F2D82FAA1 (congregation_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE congregation_offerings ADD CONSTRAINT FK_B46200E12D82FAA1 FOREIGN KEY (congregation_id) REFERENCES congregations (id)');
        $this->addSql('ALTER TABLE members ADD CONSTRAINT FK_45A0D2FF2D82FAA1 FOREIGN KEY (congregation_id) REFERENCES congregations (id)');
        $this->addSql('ALTER TABLE tithes ADD CONSTRAINT FK_C64CE97FA1656A89 FOREIGN KEY (the_member_id) REFERENCES members (id)');
        $this->addSql('ALTER TABLE tithes ADD CONSTRAINT FK_C64CE97F2D82FAA1 FOREIGN KEY (congregation_id) REFERENCES congregations (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE congregation_offerings DROP FOREIGN KEY FK_B46200E12D82FAA1');
        $this->addSql('ALTER TABLE members DROP FOREIGN KEY FK_45A0D2FF2D82FAA1');
        $this->addSql('ALTER TABLE tithes DROP FOREIGN KEY FK_C64CE97FA1656A89');
        $this->addSql('ALTER TABLE tithes DROP FOREIGN KEY FK_C64CE97F2D82FAA1');
        $this->addSql('DROP TABLE admins');
        $this->addSql('DROP TABLE congregation_offerings');
        $this->addSql('DROP TABLE congregations');
        $this->addSql('DROP TABLE members');
        $this->addSql('DROP TABLE tithes');
    }
}
