<?php

namespace App\Filament\Resources\CoachLoginResource\Pages;

use App\Filament\Resources\CoachLoginResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListCoachLogins extends ListRecords
{
    protected static string $resource = CoachLoginResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
