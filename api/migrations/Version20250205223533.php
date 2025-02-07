<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250205223533 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE congregation_offerings DROP FOREIGN KEY FK_B46200E12D82FAA1');
        $this->addSql('ALTER TABLE congregation_offerings ADD CONSTRAINT FK_B46200E12D82FAA1 FOREIGN KEY (congregation_id) REFERENCES congregations (id) ON DELETE SET NULL');
        $this->addSql('ALTER TABLE members DROP FOREIGN KEY FK_45A0D2FF2D82FAA1');
        $this->addSql('ALTER TABLE members ADD CONSTRAINT FK_45A0D2FF2D82FAA1 FOREIGN KEY (congregation_id) REFERENCES congregations (id) ON DELETE SET NULL');
        $this->addSql('ALTER TABLE tithes DROP FOREIGN KEY FK_C64CE97F2D82FAA1');
        $this->addSql('ALTER TABLE tithes DROP FOREIGN KEY FK_C64CE97FA1656A89');
        $this->addSql('ALTER TABLE tithes ADD CONSTRAINT FK_C64CE97F2D82FAA1 FOREIGN KEY (congregation_id) REFERENCES congregations (id) ON DELETE SET NULL');
        $this->addSql('ALTER TABLE tithes ADD CONSTRAINT FK_C64CE97FA1656A89 FOREIGN KEY (the_member_id) REFERENCES members (id) ON DELETE SET NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE tithes DROP FOREIGN KEY FK_C64CE97FA1656A89');
        $this->addSql('ALTER TABLE tithes DROP FOREIGN KEY FK_C64CE97F2D82FAA1');
        $this->addSql('ALTER TABLE tithes ADD CONSTRAINT FK_C64CE97FA1656A89 FOREIGN KEY (the_member_id) REFERENCES members (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('ALTER TABLE tithes ADD CONSTRAINT FK_C64CE97F2D82FAA1 FOREIGN KEY (congregation_id) REFERENCES congregations (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('ALTER TABLE congregation_offerings DROP FOREIGN KEY FK_B46200E12D82FAA1');
        $this->addSql('ALTER TABLE congregation_offerings ADD CONSTRAINT FK_B46200E12D82FAA1 FOREIGN KEY (congregation_id) REFERENCES congregations (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('ALTER TABLE members DROP FOREIGN KEY FK_45A0D2FF2D82FAA1');
        $this->addSql('ALTER TABLE members ADD CONSTRAINT FK_45A0D2FF2D82FAA1 FOREIGN KEY (congregation_id) REFERENCES congregations (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
    }
}
